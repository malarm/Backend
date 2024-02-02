import { NextFunction, Request, Response } from 'express';
import {
	Op, WhereOptions, fn, col
} from 'sequelize';
import { notFound } from '@jdpnielsen/http-error';
import db from '../../models/index';
import { getPagination, getPagingData } from '../../utils/pagingUtils';
import { getSortCriteria } from '../../utils/sortingUtils';

export async function getAll(req: Request, res: Response, next: NextFunction) {
	try {
		const {
			page, size, sortBy, sort, search, country
		} = req.query;
		let where: WhereOptions = {};
		const { limit, offset } = getPagination(
			parseInt(page?.toString(), 10) || 0,
			parseInt(size?.toString(), 10) || 10
		);
		const order = getSortCriteria(sortBy?.toString(), sort?.toString());
		if (country && country?.toString() !== '') {
			where.country = country?.toString();
		}
		if (search && search?.toString() !== '') {
			const searchCond: any = {
				[Op.or]: [
					{
						firstName: { [Op.iLike]: `%${search.toString()}%` }
					},
					{
						email: { [Op.iLike]: `%${search.toString()}%` }
					},
					{
						id: parseInt(search.toString(), 10) || -1
					},
				]
			};
			where = { ...where, ...searchCond };
		}
		const customerList = await db.customer.findAndCountAll({
			limit,
			offset,
			order,
			where,
		});
		const response = getPagingData(customerList, parseInt(page?.toString(), 10) || 0, limit);
		return res.status(200).json(response);
	} catch (error) {
		return next(error);
	}
}

export async function getCountries(req: Request, res: Response, next: NextFunction) {
	try {
		const distinctCountries = await db.customer.findAll({
			attributes: [[fn('DISTINCT', col('country')), 'label']]
		});
		return res.status(200).json(distinctCountries);
	} catch (error) {
		return next(error);
	}
}

export async function getCustomerById(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const customer = await db.customer.findByPk(
			parseInt(id, 10),
			{
				include: [{ model: db.order }],
			}
		);
		if (!customer) {
			throw notFound(`Customer id - ${id} does not exist`);
		}
		return res.status(200).json(customer);
	} catch (error) {
		return next(error);
	}
}
