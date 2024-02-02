import { NextFunction, Request, Response } from 'express';
import { col, fn, Op, Sequelize, WhereOptions } from 'sequelize';
import { failedDependency, notFound, preconditionFailed, serverError } from '@jdpnielsen/http-error';
import { AxiosResponse } from 'axios';
import { WarrantyAttributes } from 'models/warranties';
import { CreateOrderType } from 'lib/schemas';
import { freshDeskEmailTemplate, sendFreshDeskEmail } from '../../lib/pevino/pevinoHelper';
import { getPagination, getPagingData } from '../../utils/pagingUtils';
import { getSortCriteria } from '../../utils/sortingUtils';
import { FindRequest, GetByIdRequest, CreateRequest, CreateSolutionRequest, UpdateOrderTechnicianRequest, UpdateOrderTechnicianCostRequest, FinalizeAndReOpenSolutionRequest, CreateCommentRequest, DeleteSolutionRequest, RemoveRequest, UpdateCompensationAmountRequest, UpdateCreditAmountRequest, UpdateReplaceAmountRequest, UpdateCommentRequest, WarrantyWebShopRequest, Product, OrderLineItemRequest } from './schema';
import db from '../../models/index';
import logger from '../../config/logger';
import { escapeChars, replaceNewLine, replaceTab } from '../../utils/messageUtil';
import { syncNewOrder, updateOrderStatus, updateOrderComment } from '../../lib/sync/webShopSync';
import { calcConversionPrice } from '../../lib/pevino/conversionPrice';
import { deleteFile } from './fileupload';

async function GetWarrantyDataById(warrantyId: number) {
	return db.warranty.findByPk(warrantyId, {
		include: [
			{ model: db.warrantyProducts, include: [{ model: db.product }, { model: db.warrantyPicturesUpload }, { model: db.supplier }] },
			{
				model: db.warrantySolution,
				include: [
					{ model: db.user },
					{ model: db.technician }
				]
			},
			{ model: db.warrantyActivities, include: [{ model: db.user, attributes: ['name'] }] },
			{
				model: db.order,
				on: { ol1: Sequelize.where(Sequelize.col('"order"."webshop_id"'), '=', Sequelize.col('"warranties"."order_id"')) },
				attributes: ['vat']
			}
		],
	});
}

function getInitializedWarrentySolutionComment(warrantySolutionTypeId: number): string {
	switch (warrantySolutionTypeId) {
		case 1:
			return 'Compensation solution';
		case 2:
			return 'Repair solution';
		case 3:
			return 'Replace solution';
		case 4:
			return 'Credit solution';
		case 5:
			return 'No Necessary solution';
		default:
			return '';
	}
}

export async function getAll(req: FindRequest, res: Response, next: NextFunction) {
	try {
		const {
			search,
			country,
			status,
			tag,
			productError
		} = req.query;
		let where: WhereOptions = {};
		const {
			limit,
			offset
		} = getPagination(req.query.page, req.query.size);
		const order = getSortCriteria(req.query.sortBy, req.query.orderBy);
		const whereFilterCondition = [];

		if (status && status?.toString() !== '') {
			whereFilterCondition.push(Sequelize.literal(`warranties.status = ${parseInt((status), 10)}`));
		}
		if (country && country?.toString() !== '') {
			whereFilterCondition.push(Sequelize.literal(`warranties.country = '${escapeChars(country)}'`));
		}
		if (tag && tag?.toString() !== '') {
			whereFilterCondition.push(Sequelize.literal(`warranties.warranty_tag_type_id ilike '%${escapeChars(tag)}%'`));
		}
		if (whereFilterCondition.length > 0) {
			where = { [Op.and]: whereFilterCondition };
		}
		if (search && search?.toString() !== '') {
			const searchCond: any = {
				[Op.or]: [
					Sequelize.literal(`warranties.order_id = ${Number.isNaN(parseInt(escapeChars(search?.toString()), 10)) ? -1 : parseInt(escapeChars(search?.toString()), 10)}`),
					Sequelize.literal(`warranties.name ilike '%${escapeChars(search.toString())}%'`),
					Sequelize.literal(`warranties.last_name ilike '%${escapeChars(search.toString())}%'`),
					Sequelize.literal(`warranties.email ilike '%${escapeChars(search.toString())}%'`),
					Sequelize.literal(`warranties.phone ilike '%${escapeChars(search.toString())}%'`),
					Sequelize.literal(`warranties.address ilike '%${escapeChars(search.toString())}%'`),
				]
			};
			where = { ...where, ...searchCond };
		}
		let productErrorCondition = {};
		if (productError && productError?.toString() !== '' && !Number.isNaN(parseInt(productError, 10))) {
			productErrorCondition = { warranty_product_error_id: parseInt(productError, 10) };
		}
		const warrantyList = await db.warranty.findAll({
			include: [
				{
					model: db.user,
					on: {
						col1: Sequelize.where(Sequelize.col('user.id'), '=', Sequelize.col('warranties.agentId')),
					},
					attributes: ['initialName']
				},
				{ model: db.warrantyProducts, required: true, where: productErrorCondition },
				{ model: db.warrantyActivities }
			],
			limit,
			offset,
			order,
			where: { archive: { [Op.not]: true }, ...where }
		});

		const warrantyListCount = await db.warranty.count({
			include: [
				{
					model: db.user,
					on: {
						col1: Sequelize.where(Sequelize.col('user.id'), '=', Sequelize.col('warranties.agent_id')),
					},
					attributes: ['initialName']
				},
				{ model: db.warrantyProducts, required: true, where: productErrorCondition },
			],
			distinct: true,
			where: { archive: { [Op.not]: true }, ...where }
		});
		// generate warranty tag description from comma separate warrantyTagTypeId string
		const rows = await Promise.all(warrantyList.map(async (item) => {
			const row = item.get() as WarrantyAttributes & { tags?: { id: number, title: string, class?: string }[] };
			if (row.warrantyTagTypeId) {
				row.tags = await db.warrantyTagType.findAll({
					attributes: ['id', 'title', 'class'],
					where: { id: row.warrantyTagTypeId.split(',') }
				});
			} else {
				row.tags = [];
			}
			return row;
		}));
		const response = getPagingData(
			{
				count: warrantyListCount,
				rows
			},
			req.query.page,
			limit
		);
		return res.status(200)
			.json(response);
	} catch (error) {
		return next(error);
	}
}
export async function getCountries(req: Request, res: Response, next: NextFunction) {
	try {
		const distinctCountries = await db.warranty.findAll({
			attributes: [[fn('DISTINCT', col('country')), 'label']],
			where: { archive: { [Op.not]: true } },
		});
		return res.status(200)
			.json(distinctCountries);
	} catch (error) {
		return next(error);
	}
}

export async function getStatus(req: Request, res: Response, next: NextFunction) {
	try {
		const distinctStatus = await db.warranty.findAll({
			attributes: [[fn('DISTINCT', col('status')), 'label']],
			where: { status: { [Op.not]: null }, archive: { [Op.not]: true } },
		});
		return res.status(200)
			.json(distinctStatus);
	} catch (error) {
		return next(error);
	}
}

export async function getAllWarrantyTags(req: Request, res: Response, next: NextFunction) {
	try {
		const tagList = await db.warrantyTagType.findAll({
			attributes: ['id', 'title'],
			order: [['title', 'asc']]
		});
		return res.status(200)
			.json(tagList);
	} catch (error) {
		return next(error);
	}
}

export async function getProductError(req: Request, res: Response, next: NextFunction) {
	try {
		const productError = await db.warrantyProductError.findAll({
			attributes: ['id', 'title'],
			order: [['title', 'asc']]
		});
		return res.status(200)
			.json(productError);
	} catch (error) {
		return next(error);
	}
}

export async function getWarrantyCompensation(req: Request, res: Response, next: NextFunction) {
	try {
		const warrantyCompensation = await db.warrantyCompensationStatus.findAll({
			attributes: ['id', 'title'],
		});
		return res.status(200)
			.json(warrantyCompensation);
	} catch (error) {
		return next(error);
	}
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await db.user.findAll({
			attributes: ['id', 'name'],
		});
		return res.status(200)
			.json(user);
	} catch (error) {
		return next(error);
	}
}

export async function getWarrantyById(req: GetByIdRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const warranty = await GetWarrantyDataById(id);
		// console.log(warranty);
		if (!warranty) {
			throw notFound(`warranty id - ${id} does not exist`);
		}
		return res.status(200)
			.json(warranty);
	} catch (error) {
		return next(error);
	}
}

export async function getWarrantySolutionTypes(req: Request, res: Response, next: NextFunction) {
	try {
		const solutionTypes = await db.warrantySolutionType.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			order: [['id', 'asc']]
		});
		return res.status(200)
			.json(solutionTypes);
	} catch (error) {
		return next(error);
	}
}

export async function getWarrantyTechnicianNames(req: Request, res: Response, next: NextFunction) {
	try {
		const technicianNames = await db.technician.findAll({
			attributes: ['id', 'name'],
			order: [['id', 'asc']]
		});
		return res.status(200)
			.json(technicianNames);
	} catch (error) {
		return next(error);
	}
}

export async function create(req: CreateRequest, res: Response, next: NextFunction) {
	try {
		const { customer, orderId: orderIdParam, orderLines: orderLineItems = [] } = req.body;
		const userId = req.user.id;

		const order = await db.order.findByPk(orderIdParam);
		if (!order) {
			throw notFound(`Order id - ${orderIdParam} does not exist`);
		}
		if (orderLineItems.length < 1) {
			throw preconditionFailed(`Order id - ${orderIdParam} has no order lines selected for warranty`);
		}

		const {
			webshopId: orderId,
			customerId,
			orderDate,
			orderFulfilledDate
		} = order;
		if (customer.id !== customerId) {
			throw notFound(`Order id - ${orderIdParam} has incorrect customer information`);
		}

		const createWarrantyModel = {
			warrantyTagTypeId: null,
			orderId,
			name: customer.firstName,
			lastName: customer.lastName,
			address: customer.address1,
			zipCode: customer.zipCode,
			city: customer.city,
			country: customer.country,
			countryCode: customer.countryCode,
			phone: customer.mobile,
			alternativePhone: customer.alternativePhone,
			email: customer.email,
			alternativeEmail: customer.alternativeEmail,
			status: 0,
			orderDate,
			orderFulfilledDate,
			dateCreated: new Date(),
			userId,
			agentId: null,
			dueDate: new Date(),
		};
		const warranty = await db.warranty.create(createWarrantyModel);
		const { id: warrantyId } = warranty;
		logger.info(`warranty record created successfully. id=${warrantyId}`);

		if (warrantyId > 0) {
			// create warranty activity entry
			const warrantyActivityPayload = {
				warrantyId,
				warrantyActivityTypeId: 2, // System
				comment: 'complaint created',
				dateCreated: new Date(),
				userId,
				dataLog: null
			};
			const warrantyActivity = await db.warrantyActivities.create(warrantyActivityPayload);
			logger.info(`warranty activity record created successfully. id=${warrantyActivity.id}`);

			const promises = orderLineItems.map(async (item: OrderLineItemRequest) => {
				logger.info(`item=${JSON.stringify(item)}`);
				const warrantyProductModel = {
					warrantyId,
					brandId: item.brandId,
					supplierId: item.supplierId,
					warrantyProductErrorId: item.damageType,
					amount: item.amount,
					itemNumber: item.itemNumber,
					title: item.title,
					productPricePayed: item.productPricePayed,
					discount: item.discount,
					errorDescription: item.errorDescription,
					compensationNeeded: 0,
					warrantyCompensationStatusId: null,
					file: null,
					serialNumber: item.serialNumber,
					status: 0,
					currency: order.currency,
					calculatedBuyingPrice: item.calculatedBuyingPrice,
					errorResponsible: null,
					dateCreated: new Date()
				};

				const result = await db.warrantyProducts.create(warrantyProductModel);
				logger.info(`warranty product mapping record created successfully. id=${result.id}`);
				return result;
			});

			await Promise.all(promises);
		}
		return res.status(200).json({ id: warrantyId });
	} catch (error) {
		return next(error);
	}
}

export async function update(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const { warrantyProducts } = req.body;
		if (warrantyProducts && warrantyProducts.length > 0) {
			const promises = [];
			warrantyProducts.forEach((warrantyProduct) => {
				promises.push(new Promise((resolve, reject) => {
					let {
						warrantyProductErrorId,
						warrantyCompensationStatusId,
						errorResponsible
					} = warrantyProduct;
					if (!errorResponsible || errorResponsible === '') errorResponsible = null;
					if (!warrantyProductErrorId || warrantyProductErrorId === 0) warrantyProductErrorId = null;
					if (!warrantyCompensationStatusId || warrantyCompensationStatusId === 0) warrantyCompensationStatusId = null;
					db.warrantyProducts
						.update({
							...warrantyProduct,
							errorResponsible,
							warrantyProductErrorId,
							warrantyCompensationStatusId
						}, {
							where: { id: warrantyProduct.id },
							returning: true
						})
						.then((result) => {
							logger.info(`warranty product updated successfully. id=${warrantyProduct.id}`);
							resolve(result);
						})
						.catch((e) => {
							reject(e);
						});
				}));
			});
			await Promise.all(promises)
				.catch((e) => {
					throw serverError(e.message);
				});
		}

		const [rowsUpdated, updatedValues] = await db.warranty
			.update(req.body, {
				where: { id },
				returning: true
			});

		return res.status(200)
			.json(rowsUpdated === 1
				? updatedValues[0]
				: { error: `Sorry unable to update warranty ${id}` });
	} catch (error) {
		return next(error);
	}
}

export async function updateTags(req: GetByIdRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const warranty = await db.warranty.findByPk(id, {
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			include: [
				{ model: db.warrantyProducts }
			],
		});
		if (!warranty) {
			throw notFound(`warranty id - ${id} does not exist`);
		}
		const warrantyReq: any = req.body;
		const tagIds: string = warrantyReq.warrantyTagTypeId || null;
		const [rowsUpdated, updatedValues] = await db.warranty
			.update({ warrantyTagTypeId: tagIds }, {
				where: { id },
				returning: true
			});

		return res.status(200)
			.json(rowsUpdated === 1 ? updatedValues[0] : {});
	} catch (error) {
		return next(error);
	}
}

export async function finalizeSolution(req: FinalizeAndReOpenSolutionRequest, res: Response, next: NextFunction) {
	logger.debug('inside finalize');
	try {
		const { warrantyId, warrantyProductId } = req.body;
		const warranty = await db.warranty.findByPk(warrantyId, {
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			include: [
				{ model: db.warrantyProducts }
			],
		});

		if (!warranty) {
			throw notFound(`warranty id - ${warrantyId} does not exist`);
		}
		const warrantysolution = await db.warrantySolution.findAll({
			attributes: ['id', ['warranty_solution_type_id', 'warrantySolutionTypeId'], 'status'],
			where: { warrantyId, warrantyProductId },
			order: [['warranty_solution_type_id', 'DESC']]
		});

		logger.debug(`warranty id - ${warrantyId} does not have any solution`);
		if (!warrantysolution || warrantysolution.length === 0 || warrantysolution.filter((x) => x.status !== 1).length > 0) {
			throw notFound(`warranty id - ${warrantyId} does not have any solution`);
		}
		const { warrantySolutionTypeId } = warrantysolution[0];
		logger.debug(`inside finalize warrantyId : ${warrantyId}, warrantyProductId : ${warrantyProductId}, warrantySolutionTypeId: ${warrantySolutionTypeId}`);

		await db.warrantyProducts
			.update({ status: warrantySolutionTypeId }, {
				where: { id: warrantyProductId },
				returning: true
			});

		const warrantyCheck = await db.warrantyProducts.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			where: { warrantyId }
		});

		const warrantyWithStatusZero = warrantyCheck.filter((x) => x.status === 0);

		if (warrantyWithStatusZero.length === 0) {
			await db.warranty.update({ status: 1 }, {
				where: { id: warrantyId },
				returning: true
			});
		}
		const userId: number = req.user.id;

		const commentToInsert = `${getInitializedWarrentySolutionComment(warrantySolutionTypeId)} finalized`;

		await db.warrantyActivities.create({
			warrantyId,
			warrantyActivityTypeId: 2, // System
			comment: commentToInsert,
			userId,
			dateCreated: new Date(),
			dataLog: null
		});
		return res.status(200)
			.json({});
	} catch (error) {
		return next(error);
	}
}

export async function reOpenSolution(req: FinalizeAndReOpenSolutionRequest, res: Response, next: NextFunction) {
	logger.info('inside reOpen');
	try {
		const { warrantyId, warrantyProductId } = req.body;
		const warranty = await db.warranty.findByPk(warrantyId, {
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});
		if (!warranty) {
			throw notFound(`warranty id - ${warrantyId} does not exist`);
		}
		const warrantyProduct = await db.warrantyProducts.findByPk(warrantyProductId, {
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});
		if (!warrantyProduct) {
			throw notFound(`warrantyProduct id - ${warrantyProductId} does not exist`);
		}
		logger.info(`inside reOpen warrantyId : ${warrantyId}, warrantyProductId : ${warrantyProductId}`);
		const commentToInsert = `${getInitializedWarrentySolutionComment(warrantyProduct.status)} Reopened`;

		await db.warranty
			.update({ status: 0 }, {
				where: { id: warrantyId },
				returning: true
			});
		await db.warrantyProducts
			.update({ status: 0 }, {
				where: { id: warrantyProductId },
				returning: true
			});
		const userId: number = req.user.id;
		await db.warrantyActivities.create({
			warrantyId,
			warrantyActivityTypeId: 2, // System
			comment: commentToInsert,
			userId,
			dateCreated: new Date(),
			dataLog: null
		});

		return res.status(200)
			.json({});
	} catch (error) {
		return next(error);
	}
}

export async function deleteSolution(req: DeleteSolutionRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const userId: number = req.user.id;
		const warranty = await db.warrantySolution.findByPk(id, {
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});
		const commentToInsert = `${getInitializedWarrentySolutionComment(warranty.warrantySolutionTypeId)} deleted`;

		await db.warrantySolution.destroy({ where: { id } });
		await db.warrantyActivities.create({
			warrantyId: warranty.warrantyId,
			warrantyActivityTypeId: 2, // System
			comment: commentToInsert,
			userId,
			dateCreated: new Date(),
			dataLog: null
		});
		return res.status(200)
			.json({});
	} catch (error) {
		return next(error);
	}
}

export async function createSolution(req: CreateSolutionRequest, res: Response, next: NextFunction) {
	try {
		const {
			warrantySolutionTypeId,
			warrantyProductId,
			warrantyId
		} = req.body;
		const userId: number = req.user.id;
		const warranty = await db.warranty.findByPk(warrantyId);
		if (!warranty) {
			throw notFound(`warranty id - ${warrantyId} does not exist`);
		}

		const warrantySolutionType = await db.warrantySolutionType.findByPk(warrantySolutionTypeId);
		if (!warrantySolutionType) {
			throw notFound(`warrantySolutionType id - ${warrantySolutionTypeId} does not exist`);
		}
		const createWarrantySolutionModel = {
			warrantySolutionTypeId,
			warrantyProductId,
			warrantyId,
			status: warrantySolutionType.defaultStatus,
			userId,
			dateCreated: new Date(),
		};
		logger.info(`create warranty solution ${JSON.stringify(createWarrantySolutionModel)}`);
		const warrantySolution = await db.warrantySolution.create(createWarrantySolutionModel);
		const { id: warrantySolutionId } = warrantySolution;
		logger.info(`warranty solution record created successfully. id=${warrantySolutionId}`);
		const commentToInsert = `New ${getInitializedWarrentySolutionComment(warrantySolutionTypeId)} started`;

		if (warrantySolutionId > 0) {
			const warrantyActivityModel = {
				warrantyId,
				warrantyActivityTypeId: 2, // System
				comment: commentToInsert,
				userId,
				dateCreated: new Date(),
			};
			logger.info(`create an activity record, payload ${JSON.stringify(warrantyActivityModel)}`);
			const warrantyActivity = await db.warrantyActivities.create(warrantyActivityModel);
			const { id } = warrantyActivity;
			logger.info(`activity record created successfully. id=${id}`);
		}
		return res.status(200)
			.json({ id: warrantySolutionId });
	} catch (error) {
		return next(error);
	}
}

export async function updateOrderTechnician(req: UpdateOrderTechnicianRequest, res: Response, next: NextFunction) {
	try {
		const {
			warrantySolutionId,
			warrantyId,
			technicianId,
			subject,
			message
		} = req.body;

		let htmlMessage: string;
		htmlMessage = replaceNewLine(message);
		htmlMessage = replaceTab(htmlMessage);
		htmlMessage = freshDeskEmailTemplate.replace('{message}', htmlMessage).replace('{subject}', subject);
		logger.info(`updateOrderTechnician, warrantyId:${warrantyId}, htmlMessage: ${htmlMessage}`);
		const userId: number = req.user.id;
		logger.info(`updateOrderTechnician, warrantyId:${warrantyId}, userId: ${userId}`);
		const warranty = await db.warranty.findByPk(warrantyId);
		if (!warranty) {
			logger.info(`updateOrderTechnician, warrantyId:${warrantyId} does not exists in database`);
			throw notFound(`warranty id - ${warrantyId} does not exist`);
		}

		const technician = await db.technician.findByPk(technicianId);
		if (!technician) {
			logger.info(`updateOrderTechnician, warrantyId:${warrantyId}, techId:${technicianId} does not exists in database`);
			throw notFound(`technician id - ${technician} does not exist`);
		}

		let ticketId = null;
		// no need to call freshdesk api if the technician id is 1 - "Manuel (blot registrering)"
		if (technicianId > 1) {
			try {
				const result: AxiosResponse = await sendFreshDeskEmail(null, technician.email, subject, htmlMessage);
				ticketId = result.data?.id;
			} catch (e) {
				// console.error(e);
				throw serverError('An error occurred while create ticket on Freshdesk, please try again');
			}

			if (!ticketId) {
				logger.info(`updateOrderTechnician, warrantyId:${warrantyId}, ticketId:${ticketId} is null`);
				throw serverError('Freshdesk send email api failure, please refresh your browser and try again');
			}

			logger.info(`updateOrderTechnician, warrantyId:${warrantyId}, ticketId:${ticketId}`);
		}

		const [rowsUpdated] = await db.warrantySolution
			.update({
				techId: technicianId,
				ticketId,
				dateAction: new Date(),
			}, {
				where: { id: warrantySolutionId },
				returning: true
			});
		logger.info(`updateOrderTechnician, warrantyId:${warrantyId}, warrantySolution table updated successfully, rowsUpdated:${rowsUpdated}`);

		const wActivity = await db.warrantyActivities.create({
			warrantyId,
			warrantyActivityTypeId: 3, // Email
			comment: htmlMessage,
			userId,
			dateCreated: new Date(),
			dataLog: null
		});
		logger.info(`updateOrderTechnician, warrantyId:${warrantyId}, warrantyActivity record created successfully, id:${wActivity.id}`);

		// fetch updated record and send it back to client
		const updatedWarranty = await GetWarrantyDataById(warrantyId);
		return res.status(200)
			.json(updatedWarranty);
	} catch (error) {
		return next(error);
	}
}

export async function updateOrderTechnicianCost(req: UpdateOrderTechnicianCostRequest, res: Response, next: NextFunction) {
	try {
		const {
			warrantySolutionId,
			warrantyId,
			costTechnician,
			costSpareparts,
			isFinalize
		} = req.body;
		const userId: number = req.user.id;
		logger.info(`updateOrderTechnicianCost, warrantyId:${warrantyId}, payload:${req.body}`);
		if (isFinalize) {
			const [rowsUpdated] = await db.warrantySolution
				.update({
					costTech: costTechnician,
					costSpareparts,
					dateEnded: new Date(),
					endedBy: userId,
					status: 1
				}, {
					where: { id: warrantySolutionId },
					returning: true
				});
			logger.info(`updateOrderTechnicianCost, warrantyId:${warrantyId}, warrantySolution table updated successfully, rowsUpdated:${rowsUpdated}`);
		} else {
			const [rowsUpdated] = await db.warrantySolution
				.update({
					costTech: costTechnician,
					costSpareparts
				}, {
					where: { id: warrantySolutionId },
					returning: true
				});
			logger.info(`update cost, warrantyId:${warrantyId}, warrantySolution table updated successfully, rowsUpdated:${rowsUpdated}`);
		}

		const wActivity = await db.warrantyActivities.create({
			warrantyId,
			warrantyActivityTypeId: 2, // System
			comment: isFinalize ? 'Repair finalized' : 'Repair cost updated',
			userId,
			dateCreated: new Date(),
			dataLog: null
		});
		logger.info(`updateOrderTechnicianCost, warrantyId:${warrantyId}, warrantyActivity record created successfully, id:${wActivity.id}`);

		// fetch updated record and send it back to client
		const updatedWarranty = await GetWarrantyDataById(warrantyId);

		return res.status(200)
			.json(updatedWarranty);
	} catch (error) {
		return next(error);
	}
}

export async function remove(req: RemoveRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const userId: number = req.user.id;
		// await db.warranty.destroy({ where: { id } });
		await db.warranty.update({ archive: true }, { where: { id }, returning: true });
		await db.warrantyActivities.create({
			warrantyId: Number(id),
			warrantyActivityTypeId: 2, // System
			comment: 'Warranty archieved',
			userId,
			dateCreated: new Date(),
			dataLog: null
		});

		return res.status(200)
			.json({});
	} catch (error) {
		return next(error);
	}
}
export async function createComment(req: CreateCommentRequest, res: Response, next: NextFunction) {
	try {
		const {
			warrantyId,
			warrantyActivityTypeId,
			comment
		} = req.body;
		const userId: number = req.user.id;
		const warrantyActivityModel = {
			warrantyId,
			warrantyActivityTypeId,
			comment,
			userId,
			dateCreated: new Date(),
		};
		const warrantyActivity = await db.warrantyActivities.create(warrantyActivityModel);
		const { id } = warrantyActivity;
		logger.info(`activity record created successfully. id=${id}`);
		return res.status(201).json(warrantyActivity);
	} catch (error) {
		return next(error);
	}
}
export async function updateComment(req: UpdateCommentRequest, res: Response, next: NextFunction) {
	try {
		const { id, comment } = req.body;
		const [rowsUpdated, updatedValues] = await db.warrantyActivities
			.update({ comment }, { where: { id }, returning: true });

		return res.status(200).json(rowsUpdated === 1 ? updatedValues[0] : {});
	} catch (error) {
		return next(error);
	}
}

export async function getWarrantyActivity(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const warrantyActivity = await db.warrantyActivities.findAll({
			where: { warrantyId: id },
			include: [
				{ model: db.warrantyActivityType },
				{ model: db.user }
			]
		});
		return res.status(200).json(warrantyActivity);
	} catch (error) {
		return next(error);
	}
}

function calcWebshopPrice(price: number, vat: number) {
	const calPrice = price / ((vat / 100) + 1);
	return calPrice / 100;
}

async function CreateReturnOrder(warrantyId: number, warrantySolutionId: number, amountReturnToCustomer: number, solutionName: string, next: NextFunction) {
	const warranty = (await db.warranty.findByPk(warrantyId, {
		include: [
			{ model: db.warrantySolution, where: { id: warrantySolutionId } },
			{
				model: db.warrantyProducts,
				where: { ol1: Sequelize.where(Sequelize.col('warrantyProducts.id'), '=', Sequelize.col('warrantySolutions.warranty_product_id')) },
				include: [{ model: db.product }]
			},
			{
				model: db.order,
				on: { ol1: Sequelize.where(Sequelize.col('"order"."webshop_id"'), '=', Sequelize.col('"warranties"."order_id"')) },
				include: [
					{ model: db.company },
					{ model: db.customer, include: [{ model: db.country }] }
				]
			}
		]
	})).get() as unknown as WarrantyWebShopRequest;

	if (!warranty) {
		throw notFound(`warranty id - ${warrantyId} does not exist`);
	}

	const warrantySolution = warranty.warrantySolutions[0];
	if (!warrantySolution) {
		throw notFound(`warranty solution id - ${warrantySolutionId} does not exist`);
	}

	const warrantyProduct = warranty.warrantyProducts[0];
	if (!warrantyProduct) {
		throw notFound(`warranty Product id - ${warrantySolution.warrantyProductId} does not exist`);
	}

	const { product } = warrantyProduct;
	if (!product) {
		throw notFound(`Product itemNumber - ${warrantyProduct.itemNumber} does not exist`);
	}

	const oldOrder = warranty.order;
	if (!oldOrder) {
		throw notFound(`Order Webshop id - ${warranty.orderId} does not exist`);
	}

	const { company } = oldOrder;
	if (!company) {
		throw notFound(`company - ${oldOrder.companyId} does not exist`);
	}

	const currency = await db.currency.findOne({ where: { currency: oldOrder.currency } });
	if (!currency) {
		throw notFound(`currency - ${oldOrder.currency} does not exist`);
	}

	const oldOrderCustomer = oldOrder.customer;
	if (!oldOrderCustomer) {
		throw notFound(`Customer id - ${oldOrder.customerId} does not exist`);
	}

	const country = oldOrderCustomer.countries[0];
	if (!country) {
		throw notFound(`Country - ${oldOrderCustomer.country} does not exist`);
	}
	try {
		const orderData: CreateOrderType = {
			CurrencyId: currency.id,
			LanguageISO: oldOrder.iso,
			CustomerComment: `${product.itemNumber}, ${product.title} return`,
			DeliveryComment: oldOrder.orderComment,
			DeliveryPrice: oldOrder.deliveryCost,
			PaymentId: oldOrder.paymentMethodId,
			DeliveryId: oldOrder.deliveryMethod == null || oldOrder.deliveryMethod === '' ? 52 : Number(oldOrder.deliveryMethod),
			ReferenceNumber: `${solutionName} solution - Return order`,
			SiteId: oldOrder.siteId,
			Origin: `${oldOrder.webshopId}`,
			OrderCustomer: {
				CountryCode: warranty.countryCode,
				Country: warranty.country,
				Company: company.name,
				Cvr: null,
				Firstname: warranty.name,
				Lastname: warranty.lastName,
				Email: warranty.email,
				Address: warranty.address,
				Address2: null,
				City: warranty.city,
				Zip: warranty.zipCode,
				Phone: warranty.phone,
				State: null
			},
			OrderLines: {
				item: [{
					Amount: Number(warrantyProduct.amount * -1),
					BuyPrice: 0,
					Discount: 0,
					Price: solutionName === 'Replace' ? 0 : calcWebshopPrice(100 * Number(amountReturnToCustomer), country.vat),
					ProductId: 1845,
					Unit: 'stk.',
					variantId: '',
				}]
			}
		};
		// const returnOrderId = 120025;
		logger.info(`input data:${JSON.stringify(orderData)}`);
		const orderRepsonse = await syncNewOrder(orderData);
		logger.info(`webshop Response : ${orderRepsonse[0].Order_CreateResult}`);
		const returnOrderId = orderRepsonse[0].Order_CreateResult;
		const orderUpdateStatusRepsonse = await updateOrderStatus(returnOrderId, 11);
		logger.info(`order update status Response${orderUpdateStatusRepsonse}`);
		const todayDate = new Date();
		const comment = `${todayDate.getDate()}/${todayDate.getMonth() + 1}: ${solutionName} Solution.`;
		const orderUpdateCommentRepsonse = await updateOrderComment(returnOrderId, comment);
		logger.info(`order update comment Response${orderUpdateCommentRepsonse}`);
		return returnOrderId;
	} catch (error) {
		return next(error);
	}
}

async function CreateZeroOrder(warrantyId: number, warrantySolutionId: number, productId: number, next: NextFunction) {
	const warranty = (await db.warranty.findByPk(warrantyId, {
		include: [
			{ model: db.warrantySolution, where: { id: warrantySolutionId } },
			{
				model: db.warrantyProducts,
				where: { ol1: Sequelize.where(Sequelize.col('warrantyProducts.id'), '=', Sequelize.col('warrantySolutions.warranty_product_id')) },
				include: [{ model: db.product }]
			},
			{
				model: db.order,
				on: { ol1: Sequelize.where(Sequelize.col('"order"."webshop_id"'), '=', Sequelize.col('"warranties"."order_id"')) },
				include: [
					{ model: db.company },
					{ model: db.customer, include: [{ model: db.country }] }
				]
			}
		]
	})).get() as unknown as WarrantyWebShopRequest;

	if (!warranty) {
		throw notFound(`warranty id - ${warrantyId} does not exist`);
	}

	const warrantySolution = warranty.warrantySolutions[0];
	if (!warrantySolution) {
		throw notFound(`warranty solution id - ${warrantySolutionId} does not exist`);
	}

	const warrantyProduct = warranty.warrantyProducts[0];
	if (!warrantyProduct) {
		throw notFound(`warranty Product id - ${warrantySolution.warrantyProductId} does not exist`);
	}

	let { product } = warrantyProduct;
	if (!product) {
		throw notFound(`Product itemNumber - ${warrantyProduct.itemNumber} does not exist`);
	}

	if (product.id !== productId) {
		product = await db.product.findByPk(productId) as Product;
		if (!product) {
			throw notFound(`New Product id - ${productId} does not exist`);
		}
	}

	const oldOrder = warranty.order;
	if (!oldOrder) {
		throw notFound(`Order Webshop id - ${warranty.orderId} does not exist`);
	}

	const { company } = oldOrder;
	if (!company) {
		throw notFound(`company - ${oldOrder.companyId} does not exist`);
	}

	const currency = await db.currency.findOne({ where: { currency: oldOrder.currency } });
	if (!currency) {
		throw notFound(`currency - ${oldOrder.currency} does not exist`);
	}

	const oldOrderCustomer = oldOrder.customer;
	if (!oldOrderCustomer) {
		throw notFound(`Customer id - ${oldOrder.customerId} does not exist`);
	}

	const country = oldOrderCustomer.countries[0];
	if (!country) {
		throw notFound(`Country - ${oldOrderCustomer.country} does not exist`);
	}
	try {
		const orderData: CreateOrderType = {
			CurrencyId: currency.id,
			LanguageISO: oldOrder.iso,
			CustomerComment: `${product.itemNumber}, ${product.title} Replace Order`,
			DeliveryComment: oldOrder.orderComment,
			DeliveryPrice: oldOrder.deliveryCost,
			PaymentId: oldOrder.paymentMethodId,
			DeliveryId: oldOrder.deliveryMethod == null || oldOrder.deliveryMethod === '' ? 52 : Number(oldOrder.deliveryMethod),
			ReferenceNumber: 'Replace order',
			SiteId: oldOrder.siteId,
			Origin: `${oldOrder.webshopId}`,
			OrderCustomer: {
				CountryCode: warranty.countryCode,
				Country: warranty.country,
				Company: company.name,
				Cvr: null,
				Firstname: warranty.name,
				Lastname: warranty.lastName,
				Email: warranty.email,
				Address: warranty.address,
				Address2: null,
				City: warranty.city,
				Zip: warranty.zipCode,
				Phone: warranty.phone,
				State: null
			},
			OrderLines: {
				item: [{
					Amount: Number(warrantyProduct.amount),
					BuyPrice: calcConversionPrice(product.calculatedBuyingPrice, oldOrder.iso),
					Discount: 0,
					Price: 0,
					ProductId: product.webshopId,
					Unit: 'stk.',
					variantId: '',
				}]
			}
		};
		logger.info(`input data:${JSON.stringify(orderData)}`);
		// returnOrderId = 117899;
		const orderRepsonse = await syncNewOrder(orderData);
		logger.info(`webshop Response : ${orderRepsonse[0].Order_CreateResult}`);
		const returnOrderId = orderRepsonse[0].Order_CreateResult;
		const orderUpdateStatusRepsonse = await updateOrderStatus(returnOrderId, 2);
		logger.info(`order update status Response${orderUpdateStatusRepsonse}`);
		const todayDate = new Date();
		const comment = `${todayDate.getDate()}/${todayDate.getMonth() + 1}: Replace Solution.`;
		const orderUpdateCommentRepsonse = await updateOrderComment(returnOrderId, comment);
		logger.info(`order update comment Response${orderUpdateCommentRepsonse}`);
		return returnOrderId;
	} catch (error) {
		return next(error);
	}
}
export async function updateCompensationAmount(req: UpdateCompensationAmountRequest, res: Response, next: NextFunction) {
	try {
		const {
			warrantySolutionId,
			warrantyId,
			compensated,
			isFinalize
		} = req.body;
		const userId: number = req.user.id;
		logger.info(`updateCompensationAmount, warrantyId:${warrantyId}, payload:${req.body}`);

		if (isFinalize) {
			const returnOrderId = await CreateReturnOrder(warrantyId, warrantySolutionId, compensated, 'Compensation', next);
			if (Number.isNaN(Number(returnOrderId))) {
				throw failedDependency('Unable to create return order id');
			}

			const [rowsUpdated] = await db.warrantySolution
				.update({
					compensated,
					dateEnded: new Date(),
					endedBy: userId,
					status: 1,
					returnOrderId
				}, {
					where: { id: warrantySolutionId },
					returning: true
				});

			logger.info(`updateCompensationAmountWithFinalize, warrantyId:${warrantyId}, warrantySolution table updated successfully, rowsUpdated:${rowsUpdated}`);
		} else {
			const [rowsUpdated] = await db.warrantySolution.update({ compensated }, {
				where: { id: warrantySolutionId },
				returning: true
			});
			logger.info(`updateCompensationAmount, warrantyId:${warrantyId}, warrantySolution table updated successfully, rowsUpdated:${rowsUpdated}`);
		}

		const wActivity = await db.warrantyActivities.create({
			warrantyId,
			warrantyActivityTypeId: 2,
			comment: isFinalize ? 'Compensation finalized' : 'Compensation cost updated',
			userId,
			dateCreated: new Date(),
			dataLog: null
		});
		logger.info(`updateCompensationAmount, warrantyId:${warrantyId}, warrantyActivity record created successfully, id:${wActivity.id}`);

		// fetch updated record and send it back to client
		const updatedWarranty = await GetWarrantyDataById(warrantyId);

		return res.status(200)
			.json(updatedWarranty);
	} catch (error) {
		return next(error);
	}
}

export async function updateCreditAmount(req: UpdateCreditAmountRequest, res: Response, next: NextFunction) {
	try {
		const {
			warrantySolutionId,
			warrantyId,
			costReplace,
			costReturnShipping,
			amountReturnToCustomer,
			isEligibleToResale,
			isFinalize
		} = req.body;
		const userId: number = req.user.id;
		logger.info(`updateCreditAmount, warrantyId:${warrantyId}, payload:${req.body}`);

		const warranty = await db.warranty.findByPk(warrantyId);
		if (!warranty) {
			throw notFound(`warranty id - ${warrantyId} does not exist`);
		}

		const warrantySolution = await db.warrantySolution.findByPk(warrantySolutionId);
		if (!warrantySolution) {
			throw notFound(`warranty solution id - ${warrantySolutionId} does not exist`);
		}

		let updateProperty = {};
		if (isFinalize) {
			// if (isEligibleToResale) {
			// Creating Return order for credit on finalize and eligible to Resale
			// const returnOrderId = 120025;
			const returnOrderId = await CreateReturnOrder(warrantyId, warrantySolutionId, amountReturnToCustomer, 'Credit', next);
			if (Number.isNaN(Number(returnOrderId))) {
				throw failedDependency('Unable to create return order id');
			}
			updateProperty = { ...updateProperty, returnOrderId };
			// }

			// Adding finalize update properties
			updateProperty = {
				...updateProperty,
				dateEnded: new Date(),
				endedBy: userId,
				status: 1
			};
		}
		if (isEligibleToResale) {
			const costReturnShippingCalculate = costReturnShipping;
			updateProperty = { ...updateProperty, costReturnShipping: costReturnShippingCalculate };
		} else {
			const costReplaceCalculate = costReplace;
			updateProperty = { ...updateProperty, costReplace: costReplaceCalculate };
		}
		logger.info(`update property: ${JSON.stringify(updateProperty)}`);
		const [rowsUpdated] = await db.warrantySolution
			.update(updateProperty, {
				where: { id: warrantySolutionId },
				returning: true
			});
		logger.info(`updateCreditAmount, warrantySolutionId:${warrantySolutionId}, warrantySolution table updated successfully, rowsUpdated:${rowsUpdated}`);

		/* const [productRowsUpdated] = await db.warrantyProducts
				.update({ productPricePayed: amountReturnToCustomer * 100 }, {
					where: { id: warrantySolution.warrantyProductId },
					returning: true
				}); */
		// logger.info(`updateCreditAmount, warranty Product Id:${warrantySolution.warrantyProductId}, warrantyProducts table updated successfully, rowsUpdated:${productRowsUpdated}`);
		logger.info(`updateCreditAmount, warranty Product Id:${warrantySolution.warrantyProductId}, warrantyProducts table updated successfully`);

		let commentToInsert = 'Credit finalized';
		if (!isFinalize) {
			commentToInsert = isEligibleToResale ? 'Return Shipping Cost updated' : 'Cost to Replace updated';
		}

		const wActivity = await db.warrantyActivities.create({
			warrantyId,
			warrantyActivityTypeId: 2,
			comment: commentToInsert,
			userId,
			dateCreated: new Date(),
			dataLog: null
		});
		logger.info(`updateCreditAmount, warrantyId:${warrantyId}, warrantyActivity record created successfully, id:${wActivity.id}`);

		// fetch updated record and send it back to client
		const updatedWarranty = await GetWarrantyDataById(warrantyId);

		return res.status(200)
			.json(updatedWarranty);
	} catch (error) {
		return next(error);
	}
}

export async function updateReplaceAmount(req: UpdateReplaceAmountRequest, res: Response, next: NextFunction) {
	try {
		const {
			warrantySolutionId,
			warrantyId,
			addZeroOrderToCustomer,
			addReturnOrderToCustomer,
			productId,
			newProductPriceCost,
			newProductShipmentCost,
			oldProductShipmentCost,
			isFinalize
		} = req.body;
		const userId: number = req.user.id;
		logger.info(`updateReplaceAmount, warrantyId:${warrantyId}, payload:${req.body}`);

		let updateProperty = {
			costReturnShipping: oldProductShipmentCost,
			costShipping: newProductShipmentCost,
			costReplace: newProductPriceCost,
		};
		if (isFinalize) {
			updateProperty = {
				...updateProperty,
				...{
					dateEnded: new Date(),
					endedBy: userId,
					status: 1
				}
			};
			if (addZeroOrderToCustomer) {
				// const zeroOrderId = 118175;
				const zeroOrderId = await CreateZeroOrder(warrantyId, warrantySolutionId, productId, next);
				updateProperty = { ...updateProperty, ...{ replaceOrderId: zeroOrderId } };
			}
			if (addReturnOrderToCustomer) {
				// const returnOrderId = 118176;
				const returnOrderId = await CreateReturnOrder(warrantyId, warrantySolutionId, 0, 'Replace', next);
				updateProperty = { ...updateProperty, ...{ returnOrderId } };
			}
		}

		const [rowsUpdated] = await db.warrantySolution
			.update(updateProperty, {
				where: { id: warrantySolutionId },
				returning: true
			});
		logger.info(`${isFinalize ? 'updateReplaceAmountWithFinalize' : 'updateReplaceAmount'}, warrantyId:${warrantyId}, warrantySolution table updated successfully, rowsUpdated:${rowsUpdated}`);

		const wActivity = await db.warrantyActivities.create({
			warrantyId,
			warrantyActivityTypeId: 2,
			comment: isFinalize ? 'Replace finalized' : 'Replace cost information updated',
			userId,
			dateCreated: new Date(),
			dataLog: null
		});
		logger.info(`updateReplaceAmount, warrantyId:${warrantyId}, warrantyActivity record created successfully, id:${wActivity.id}`);

		// fetch updated record and send it back to client
		const updatedWarranty = await GetWarrantyDataById(warrantyId);

		return res.status(200)
			.json(updatedWarranty);
	} catch (error) {
		return next(error);
	}
}

export async function warrantyUpload(req: Request, res: Response, next: NextFunction) {
	try {
		if (req.files === undefined) {
			// If File not found
			logger.info('uploadProductsImages Error: No File Selected!');
			return res.status(200).json({
				isSuccess: false,
				error: { message: 'No File Selected' }
			});
		}
		// If Success
		const fileArray = req.files;
		let fileLocation: string;
		const images = [];
		const warrantyPictures = [];
		for (let i: number = 0; i < fileArray.length; i += 1) {
			fileLocation = fileArray[i].location;
			logger.info(`filename - ${fileLocation}`);
			images.push(fileLocation);
			const warrantyPicture = {
				warrantyId: req.body.warrantyId,
				warrantyProductId: req.body.warrantyProductId,
				file: fileLocation,
				createdAt: new Date()
			};
			warrantyPictures.push(warrantyPicture);
			logger.info(`warrantyPictures - ${JSON.stringify(warrantyPictures)}`);
		}

		if (warrantyPictures.length > 0) {
			await db.warrantyPicturesUpload.bulkCreate(warrantyPictures);
		}

		// Save the file name into database
		return res.status(200).json({
			isSuccess: true,
			error: { message: 'Success' }
		});
	} catch (err) {
		return next(err);
	}
}

export async function warrantyUploadDelete(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const warrantyPicture = await db.warrantyPicturesUpload.findByPk(id);
		const fileSplit = warrantyPicture.file?.split('/');
		const key = decodeURIComponent(`${fileSplit[fileSplit.length - 1]}`);
		deleteFile(key);
		await db.warrantyPicturesUpload.destroy({ where: { id } });
		return res.status(200).send();
	} catch (error) {
		return next(error);
	}
}
