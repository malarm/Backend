import { NextFunction, Response } from 'express';
import { notFound } from '@jdpnielsen/http-error';
import { getSortCriteria } from 'utils/sortingUtils';
import db from '../../models/index';
import { getPagination, getPagingData } from '../../utils/pagingUtils';
import { CreateRequest, FindRequest, GetByIdRequest, RemoveRequest, UpdateRequest } from './schema';

export async function find(req: FindRequest, res: Response, next: NextFunction) {
	try {
		const { limit, offset } = getPagination(req.query.page, req.query.size);
		const order = getSortCriteria(req.query.sortBy, req.query.orderBy);
		const companyList = await db.company.findAndCountAll({
			limit, offset, order, // where
		});
		const response = getPagingData(companyList, req.query.page, limit);
		return res.status(200).json(response);
	} catch (error) {
		return next(error);
	}
}

export async function getById(req: GetByIdRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const company = await db.company.findByPk(id);
		if (!company) {
			throw notFound(`Company id - ${id} not Found`);
		}
		return res.status(200).json(company);
	} catch (error) {
		return next(error);
	}
}

export async function create(req: CreateRequest, res: Response, next: NextFunction) {
	try {
		const company = await db.company.create(req.body);
		return res.status(201).json(company);
	} catch (error) {
		return next(error);
	}
}

export async function update(req: UpdateRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const [rowsUpdated, updatedValues] = await db.company
			.update(req.body, { where: { id }, returning: true });

		return res.status(200).json(rowsUpdated === 1 ? updatedValues[0] : {});
	} catch (error) {
		return next(error);
	}
}

export async function remove(req: RemoveRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await db.company.destroy({ where: { id } });
		return res.status(200).json({});
	} catch (error) {
		return next(error);
	}
}
