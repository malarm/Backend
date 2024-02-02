import { NextFunction, Request, Response } from 'express';
import { Op, WhereOptions } from 'sequelize';
import db from '../../models/index';
import { StatisticsReport, StatisticsOrder, WarrantyStatisticsChart, WarrantyStatisticsInstance } from './schema';

export async function getsupplier(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const suppliers = await db.supplier.findAll({
			attributes: ['id', 'title'],
		});
		return res.status(200).json(suppliers);
	} catch (error) {
		return next(error);
	}
}

async function getProductErrorCodes() {
	// sequelize get error codes from warrantyProductError table
	const warrantyProductErrors = await db.warrantyProductError.findAll({
		attributes: ['id']
	});
	return warrantyProductErrors.map((error) => error.id);
}

async function getWarranties(startDate: string, endDate: string, comparisonType: string, errorCodes: number[] = []) {
	const productErrorCodes = await getProductErrorCodes();

	const errorcodesToAccept = errorCodes.length > 0 ? errorCodes.filter((errorCode) => productErrorCodes.includes(errorCode)) : productErrorCodes;

	let whereClause: WhereOptions = {};

	if (comparisonType?.toLocaleLowerCase() === 'orderdate') {
		whereClause = { archive: { [Op.not]: true }, orderDate: { [Op.between]: [new Date(`${startDate}T00:00:00`), new Date(`${endDate}T23:59:59`)] } };
	} else {
		whereClause = { archive: { [Op.not]: true }, dateCreated: { [Op.between]: [new Date(`${startDate}T00:00:00`), new Date(`${endDate}T23:59:59`)] } };
	}

	// get all warrantySolutionTypes
	const solutionTypes = await db.warrantySolutionType.findAll();
	const solutionTypesReady = solutionTypes.map((solutionType) => solutionType.id);

	const warrantyData = (await db.warranty.findAll({
		where: whereClause,
		nest: true,
		include: [
			{
				model: db.warrantyProducts,
				nested: true,
				include: [
					{
						model: db.warrantySolution,
						nested: true,
						include: [
							{
								model: db.warrantySolutionType,
								where: { id: { [Op.in]: solutionTypesReady } }
							}
						]
					},
					{
						model: db.warrantyProductError, where: { id: { [Op.in]: errorcodesToAccept } }
					},
					{
						model: db.product
					},
					{
						model: db.supplier
					}
				]
			}
		]
	})).map((warranty) => warranty.get() as WarrantyStatisticsInstance);

	const orderIDList = warrantyData.map((x: WarrantyStatisticsInstance) => x.orderId);

	const orderLineData = (await db.order.findAll({
		where: {
			[Op.or]: [
				{ webshopId: { [Op.in]: orderIDList } },
				{ orderDate: { [Op.between]: [new Date(`${startDate}T00:00:00`), new Date(`${endDate}T23:59:59`)] } }
			]
		},
		include: [
			{
				model: db.orderLine,
				nested: true,
				include: [{
					model: db.product,
					nested: true,
					include: [
						{
							model: db.supplier
						}
					]
				}]
			}]
	})).map((order) => order.get() as unknown as StatisticsOrder);

	return { warrantyData, orderLineData };
}

function getNumberValue(value: string | number) {
	if (value === null || value === undefined || Number.isNaN(Number(value))) {
		return 0;
	}
	return Number(value);
}

export async function warrantyStatisticsGenerate(startDate: string, endDate: string, comparisonType: string, errorCodesArray: number[]) {
	const warranties = await getWarranties(String(startDate), String(endDate), String(comparisonType), errorCodesArray);
	const statistics: StatisticsReport[] = [];
	const currencyData = await db.currency.findAll();

	warranties.orderLineData.forEach((order) => {
		const currencies = currencyData.filter((c) => c.currency === order.currency);
		const currencyPrice = currencies.length > 0 ? currencies[0].price : 100;

		order.orderLines.forEach((orderLine) => {
			const rowRevenue = ((Number(orderLine.price) - Number(orderLine.discount)) / 100) * orderLine.amount * (currencyPrice / 100);
			const rowGrossMargin = rowRevenue - (((orderLine?.product?.calculatedBuyingPrice ?? 0) * orderLine.amount));
			const soldItems = orderLine.amount;
			const supplier = orderLine?.product?.supplier?.title ?? 'Unknown';
			const supplierIndex = statistics.findIndex((stat) => stat.supplier === supplier);
			if (supplierIndex === -1) {
				statistics.push({
					supplier,
					items: [{
						itemNumber: orderLine.itemNumber,
						revenue: rowRevenue,
						soldItems,
						warrantyItems: 0,
						percentageOfWarrantyItems: 0
					}],
					revenue: rowRevenue,
					grossMargin: rowGrossMargin,
					margin: 0,
					soldItems,
					replacementCost: 0,
					otherCost: 0,
					marginAfterCosts: 0,
					marginAfterCostsPercentage: 0,
					warrantyItems: 0,
					percentageOfWarrantyItems: 0,
					replacementNewItems: 0
				});
			} else {
				statistics[supplierIndex].revenue += rowRevenue;
				statistics[supplierIndex].grossMargin += rowGrossMargin;
				statistics[supplierIndex].soldItems += soldItems;
				const itemIndex = statistics[supplierIndex].items.findIndex((item) => item.itemNumber === orderLine.itemNumber);
				if (itemIndex === -1) {
					statistics[supplierIndex].items.push({
						itemNumber: orderLine.itemNumber,
						revenue: rowRevenue,
						soldItems,
						warrantyItems: 0,
						percentageOfWarrantyItems: 0
					});
				} else {
					statistics[supplierIndex].items[itemIndex].revenue += rowRevenue;
					statistics[supplierIndex].items[itemIndex].soldItems += soldItems;
				}
			}
		});
	});

	warranties.warrantyData.forEach((warranty) => {
		warranty.warrantyProducts.forEach((warrantyProduct) => {
			let replacementCost = 0;
			let otherCost = 0;

			const supplier = warrantyProduct.supplier?.title ?? 'Unknown';
			const supplierIndex = statistics.findIndex((stat) => stat.supplier === supplier);

			if (supplierIndex !== -1) {
				warrantyProduct.warrantySolutions.forEach((warrantySolution) => {
					let tempReplacementCost = 0;
					tempReplacementCost += getNumberValue(warrantySolution.costReplace);
					tempReplacementCost += getNumberValue(warrantySolution.costShipping);
					tempReplacementCost += getNumberValue(warrantySolution.costReturnShipping);
					replacementCost += tempReplacementCost;

					let tempOtherCost = 0;
					tempOtherCost += getNumberValue(warrantySolution.costSpareparts);
					tempOtherCost += getNumberValue(warrantySolution.costTech);
					otherCost += tempOtherCost;
				});

				statistics[supplierIndex].replacementCost += replacementCost;
				statistics[supplierIndex].otherCost += otherCost;
				statistics[supplierIndex].warrantyItems += warrantyProduct.amount;
				statistics[supplierIndex].replacementNewItems += warrantyProduct.status === 3 ? warrantyProduct.amount : 0;

				const itemIndex = statistics[supplierIndex].items.findIndex((item) => item.itemNumber === warrantyProduct.itemNumber);
				if (itemIndex !== -1) {
					statistics[supplierIndex].items[itemIndex].warrantyItems += warrantyProduct.amount;
				}
			}
		});
	});

	statistics.forEach((stat) => {
		stat.margin = (stat.grossMargin / stat.revenue) * 100;
		stat.marginAfterCosts = stat.grossMargin - stat.replacementCost - stat.otherCost;
		stat.marginAfterCostsPercentage = (stat.marginAfterCosts / stat.revenue) * 100;
		stat.percentageOfWarrantyItems = (stat.warrantyItems / stat.soldItems) * 100;
		stat.items.forEach((item) => {
			item.percentageOfWarrantyItems = (item.warrantyItems / item.soldItems) * 100;
		});
	});

	return statistics;
}

function padLeadingZeros(num: number, size: number) {
	let s = String(num);
	while (s.length < size) s = `0${s}`;
	return s;
}

export async function warrantyStatisticsReport(req: Request, res: Response, next: NextFunction) {
	const { startDate, endDate, comparisonType, errorCodes } = req.query;
	const errorCodesArray = String(errorCodes).length > 0 ? (String(errorCodes)?.split(',')?.map((errorCode) => Number(errorCode)) ?? []) : [];

	// comparison type should be either 'warrantyDate' or 'orderDate'
	if (comparisonType !== 'warrantyDate' && comparisonType !== 'orderDate') {
		return res.status(200).json({
			isSuccess: false,
			error: { message: 'ComparisonType is not correct' }
		});
	}
	try {
		// create new variable with prevstartdate and prevenddate for getting previous year data
		const prevStartDate = new Date(`${startDate}T00:00:00`);
		const prevEndDate = new Date(`${endDate}T23:59:59`);
		prevStartDate.setFullYear(prevStartDate.getFullYear() - 1);
		prevEndDate.setFullYear(prevEndDate.getFullYear() - 1);

		// format String(endDate), prevStartDate and prevEndDate to YYYY-MM-DD
		const prevStartDateString = `${prevStartDate.getFullYear()}-${padLeadingZeros(prevStartDate.getMonth() + 1, 2)}-${padLeadingZeros(prevStartDate.getDate(), 2)}`;
		const prevEndDateString = `${prevEndDate.getFullYear()}-${padLeadingZeros(prevEndDate.getMonth() + 1, 2)}-${padLeadingZeros(prevEndDate.getDate(), 2)}`;

		const currentYear = await warrantyStatisticsGenerate(String(startDate), String(endDate), String(comparisonType), errorCodesArray);
		const previousYear = await warrantyStatisticsGenerate(prevStartDateString, prevEndDateString, String(comparisonType), errorCodesArray);

		return res.status(200).send({ currentYear, previousYear });
	} catch (error) {
		return next(error);
	}
}

export async function warrantyStatisticsChart(req: Request, res: Response, next: NextFunction) {
	const { startDate, endDate, comparisonType, errorCodes } = req.query;
	const errorCodesArray = String(errorCodes).length > 0 ? (String(errorCodes)?.split(',')?.map((errorCode) => Number(errorCode)) ?? []) : [];
	if (comparisonType !== 'warrantyDate' && comparisonType !== 'orderDate') {
		return res.status(200).json({
			isSuccess: false,
			error: { message: 'ComparisonType is not correct' }
		});
	}
	try {
		const warranties = await getWarranties(String(startDate), String(endDate), String(comparisonType), errorCodesArray);
		const warrantyStatisticsChartData: WarrantyStatisticsChart[] = [];
		warranties.warrantyData.forEach((warranty) => {
			let tempDate = `${warranty.orderDate.getFullYear()}-${padLeadingZeros(warranty.orderDate.getMonth() + 1, 2)}-${padLeadingZeros(warranty.orderDate.getDate(), 2)}`;
			if (comparisonType === 'warrantyDate') {
				tempDate = `${warranty.dateCreated.getFullYear()}-${padLeadingZeros(warranty.dateCreated.getMonth() + 1, 2)}-${padLeadingZeros(warranty.dateCreated.getDate(), 2)}`;
			}
			warranty.warrantyProducts.forEach((warrantyProduct) => {
				const dateIndex = warrantyStatisticsChartData.findIndex((stat) => stat.date === tempDate);
				if (dateIndex === -1) {
					warrantyStatisticsChartData.push({
						date: tempDate,
						warrantyItem: warrantyProduct.amount,
					});
				} else {
					warrantyStatisticsChartData[dateIndex].warrantyItem += warrantyProduct.amount;
				}
			});
		});
		return res.status(200).send(warrantyStatisticsChartData);
	} catch (error) {
		return next(error);
	}
}
