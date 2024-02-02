import { NextFunction, Request, Response } from 'express';
import {
	Op, Sequelize, WhereOptions, fn, col
} from 'sequelize';
import { escapeChars } from 'utils/messageUtil';
import { notFound } from '@jdpnielsen/http-error';
import db from '../../models/index';
import { getPagination, getPagingData } from '../../utils/pagingUtils';
import { getSortCriteria } from '../../utils/sortingUtils';
import { GetByIdRequest } from './schema';

export async function getAll(req: Request, res: Response, next: NextFunction) {
	try {
		const {
			page,
			size,
			sortBy,
			sort,
			search,
			iso,
			status,
			startDate,
			endDate,
		} = req.query;
		let startDateVal;
		let endDateVal;
		let where: WhereOptions = {};
		const { limit, offset } = getPagination(
			parseInt(page?.toString(), 10) || 0,
			parseInt(size?.toString(), 10) || 10
		);
		const order = getSortCriteria(sortBy?.toString(), sort?.toString());
		if (startDate && endDate) {
			startDateVal = startDate;
			endDateVal = endDate;
		} else if (startDate && !endDate) {
			startDateVal = new Date(startDate.toString());
			endDateVal = new Date();
		} else {
			endDateVal = new Date();
			startDateVal = new Date().setFullYear(endDateVal.getFullYear() - 1);
		}
		where.orderDate = {
			[Op.between]: [startDateVal, endDateVal],
		};
		if (iso && iso?.toString() !== '') {
			where.iso = iso?.toString();
		}
		if (status && status?.toString() !== '') {
			where.orderStatusId = parseInt(status?.toString(), 10);
		}

		if (search && search?.toString() !== '') {
			const searchCond: any = {
				[Op.or]: [
					Sequelize.literal(`"order".webshop_id = ${Number.isNaN(parseInt(escapeChars(search?.toString()), 10)) ? -1 : parseInt(escapeChars(search?.toString()), 10)}`),
					Sequelize.literal(`"customer".id = ${Number.isNaN(parseInt(escapeChars(search?.toString()), 10)) ? -1 : parseInt(escapeChars(search?.toString()), 10)}`),
					Sequelize.literal(`customer.mobile ilike '%${search.toString()}%'`),
					Sequelize.literal(`customer.email ilike '%${search.toString()}%'`),
				],
			};
			where = { ...where, ...searchCond };
		}

		const orderList = await db.order.findAll({
			include: [
				{ model: db.orderLine },
				{ model: db.paymentMethod },
				{ model: db.orderStatus },
				{ model: db.customer, required: true, all: true },
				{ model: db.company },
			],
			limit,
			offset,
			order,
			where,
		});
		const orderListCount = await db.order.count({
			include: [
				{ model: db.customer, required: false }

			],
			where,
		});
		const response = getPagingData({
			count: orderListCount,
			rows: orderList
		}, parseInt(page?.toString(), 10) || 0, limit);
		return res.status(200).json(response);
	} catch (error) {
		return next(error);
	}
}

export async function getIsoList(req: Request, res: Response, next: NextFunction) {
	try {
		const distinctIso = await db.order.findAll({
			attributes: [[fn('DISTINCT', col('iso')), 'label']],
			where: { iso: { [Op.not]: null } },
		});
		return res.status(200).json(distinctIso);
	} catch (error) {
		return next(error);
	}
}

export async function getStatuses(req: Request, res: Response, next: NextFunction) {
	try {
		const statuses = await db.orderStatus.findAll({
			attributes: ['id', 'title'],
		});
		return res.status(200).json(statuses);
	} catch (error) {
		return next(error);
	}
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const order = await db.order.findByPk(parseInt(id, 10), {
			include: [
				{ model: db.orderLine },
				{ model: db.paymentMethod },
				{ model: db.orderStatus },
				{ model: db.customer },
				{ model: db.company },
			],
		});
		if (!order) {
			throw notFound(`Order id - ${id} does not exist`);
		}
		return res.status(200).json(order);
	} catch (error) {
		return next(error);
	}
}

export async function getOrderDetailsForCreateWarranty(req: GetByIdRequest, res: Response, next: NextFunction) {
	try {
		const result = {
			customer: {},
			orderLines: [],
			errorsList: []
		};
		const { id } = req.params;
		const order = await db.order.findByPk(id);
		if (!order) {
			throw notFound(`Order id - ${id} does not exist`);
		}
		const { customerId } = order;
		const customer = await db.customer.findByPk(customerId);
		if (!customer) {
			throw notFound(`Customer not exists for the Order id - ${id}`);
		}
		result.customer = customer;
		const orderLines = await db.orderLine.findAll({
			where: { orderId: id },
			include: [
				{ model: db.product }
			],
			order: [['id', 'asc']]
		});
		if (!orderLines) {
			throw notFound(`Customer not exists for the Order id - ${id}`);
		}
		result.orderLines = Object.assign([], orderLines);
		// get predefined product errors
		result.errorsList = await db.warrantyProductError.findAll({
			attributes: ['id', 'title'],
			order: [['title', 'asc']]
		});
		return res.status(200).json(result);
	} catch (error) {
		return next(error);
	}
}
