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
		const warrantyTagList = await db.warrantyTagType.findAndCountAll({
			limit, offset, order, // where
		});
		const response = getPagingData(warrantyTagList, req.query.page, limit);
		return res.status(200).json(response);
	} catch (error) {
		return next(error);
	}
}

export async function getById(req: GetByIdRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const warrantyTag = await db.warrantyTagType.findByPk(id);
		if (!warrantyTag) {
			throw notFound(`warrantyTagType id - ${id} not Found`);
		}
		return res.status(200).json(warrantyTag);
	} catch (error) {
		return next(error);
	}
}

export async function create(req: CreateRequest, res: Response, next: NextFunction) {
	try {
		const warrantyTag = await db.warrantyTagType.create(req.body);
		return res.status(201).json(warrantyTag);
	} catch (error) {
		return next(error);
	}
}

export async function update(req: UpdateRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const [rowsUpdated, updatedValues] = await db.warrantyTagType
			.update(req.body, { where: { id }, returning: true });

		return res.status(200).json(rowsUpdated === 1 ? updatedValues[0] : {});
	} catch (error) {
		return next(error);
	}
}

export async function remove(req: RemoveRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await db.warrantyTagType.destroy({ where: { id } });
		return res.status(200).json({});
	} catch (error) {
		return next(error);
	}
}
