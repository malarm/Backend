import { NextFunction, Request, Response } from 'express';
import { Op, WhereOptions } from 'sequelize';
import db from '../../models/index';
import { WarrantyCompensationType, CompensationReport } from './schema';

async function getProductErrorCodes() {
	// sequelize get error codes from warrantyProductError table
	const warrantyProductErrors = await db.warrantyProductError.findAll({
		attributes: ['id']
	});
	return warrantyProductErrors.map((error) => error.id);
}

async function getWarranties(startDate: string, endDate: string, comparisonType: string, isFilterDate: boolean, errorCodes: number[] = []) {
	let whereClause: WhereOptions = { archive: { [Op.not]: true } };

	const productErrorCodes = await getProductErrorCodes();
	const errorcodesToAccept = errorCodes.length > 0 ? errorCodes.filter((errorCode) => productErrorCodes.includes(errorCode)) : productErrorCodes;

	if (isFilterDate) {
		whereClause = { ...whereClause, dateCreated: { [Op.between]: [new Date(`${startDate}T00:00:00`), new Date(`${endDate}T23:59:59`)] } };
	}

	const warrantyInfo = (await db.warranty.findAll({
		where: whereClause,
		nest: true,
		include: [
			{
				model: db.warrantyProducts,
				where: { warrantyCompensationStatusId: { [Op.gt]: 0 } },
				nested: true,
				include: [
					{
						model: db.supplier
					},
					{
						model: db.warrantyProductError, where: { id: { [Op.in]: errorcodesToAccept } }
					},
				]
			}
		]
	})).map((warranty) => warranty.get() as unknown as WarrantyCompensationType);

	return warrantyInfo;
}

export async function generateReport(startDate: string, endDate: string, comparisonType: string, isFilterDate: boolean, errorCodes: number[] = []) {
	const warranties = await getWarranties(String(startDate), String(endDate), String(comparisonType), isFilterDate, errorCodes);
	const compensations: CompensationReport[] = [];

	warranties.forEach((warranty) => {
		warranty.warrantyProducts.forEach((warrantyProduct) => {
			const supplier = warrantyProduct.supplier?.title ?? 'Unknown';
			const supplierIndex = compensations.findIndex((stat) => stat.supplier === supplier);

			if (supplierIndex !== -1) {
				compensations[supplierIndex].notAppliedFor += warrantyProduct.warrantyCompensationStatusId === 1 ? 1 : 0;
				compensations[supplierIndex].unnecessary += warrantyProduct.warrantyCompensationStatusId === 2 ? 1 : 0;
				compensations[supplierIndex].appliedFor += warrantyProduct.warrantyCompensationStatusId === 3 ? 1 : 0;
				compensations[supplierIndex].approvedButNotReceived += warrantyProduct.warrantyCompensationStatusId === 4 ? 1 : 0;
				compensations[supplierIndex].approvedReceived += warrantyProduct.warrantyCompensationStatusId === 5 ? 1 : 0;
				compensations[supplierIndex].declined += warrantyProduct.warrantyCompensationStatusId === 6 ? 1 : 0;
				compensations[supplierIndex].total += 1;
			} else {
				compensations.push({
					supplier,
					notAppliedFor: warrantyProduct.warrantyCompensationStatusId === 1 ? 1 : 0,
					unnecessary: warrantyProduct.warrantyCompensationStatusId === 2 ? 1 : 0,
					appliedFor: warrantyProduct.warrantyCompensationStatusId === 3 ? 1 : 0,
					approvedButNotReceived: warrantyProduct.warrantyCompensationStatusId === 4 ? 1 : 0,
					approvedReceived: warrantyProduct.warrantyCompensationStatusId === 5 ? 1 : 0,
					declined: warrantyProduct.warrantyCompensationStatusId === 6 ? 1 : 0,
					notAppliedForPercentage: '',
					unnecessaryPercentage: '',
					appliedForPercentage: '',
					approvedButNotReceivedPercentage: '',
					approvedReceivedPercentage: '',
					declinedPercentage: '',
					total: 1
				});
			}
		});
	});

	compensations.forEach((comp) => {
		comp.notAppliedForPercentage = `${((comp.notAppliedFor / comp.total) * 100).toFixed(2)} %`;
		comp.unnecessaryPercentage = `${((comp.unnecessary / comp.total) * 100).toFixed(2)} %`;
		comp.appliedForPercentage = `${((comp.appliedFor / comp.total) * 100).toFixed(2)} %`;
		comp.approvedButNotReceivedPercentage = `${((comp.approvedButNotReceived / comp.total) * 100).toFixed(2)} %`;
		comp.approvedReceivedPercentage = `${((comp.approvedReceived / comp.total) * 100).toFixed(2)} %`;
		comp.declinedPercentage = `${((comp.declined / comp.total) * 100).toFixed(2)} %`;
	});

	return compensations;
}

export async function warrantyCompensationReport(req: Request, res: Response, next: NextFunction) {
	const { startDate, endDate, comparisonType, isUnlimitedDate, errorCodes } = req.query;
	const errorCodesArray = String(errorCodes).length > 0 ? (String(errorCodes)?.split(',')?.map((errorCode) => Number(errorCode)) ?? []) : [];
	// comparison type should be either 'warrantyDate' or 'orderDate'
	if (comparisonType !== 'warrantyDate' && comparisonType !== 'orderDate') {
		return res.status(200).json({
			isSuccess: false,
			error: { message: 'ComparisonType is not correct' }
		});
	}
	try {
		const filterDate = isUnlimitedDate !== 'true';
		const report = await generateReport(String(startDate), String(endDate), String(comparisonType), filterDate, errorCodesArray);
		return res.status(200).send(report);
	} catch (error) {
		return next(error);
	}
}
