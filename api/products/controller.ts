import { NextFunction, Request, Response } from 'express';
import { escapeChars } from 'utils/messageUtil';
import { col, fn, Op, Sequelize, WhereOptions } from 'sequelize';
import { notFound } from '@jdpnielsen/http-error';
import db from '../../models/index';
import { getPagination, getPagingData } from '../../utils/pagingUtils';
import { getSortCriteria } from '../../utils/sortingUtils';
import { FindRequest, GetByIdRequest } from './schema';

export async function getAll(req: FindRequest, res: Response, next: NextFunction) {
	try {
		const {
			search,
			brand,
			status,
			supplier,
			statusWhenSoldOut,
		} = req.query;
		let where: WhereOptions = {};
		const { limit, offset } = getPagination(req.query.page, req.query.size);
		const order = getSortCriteria(req.query.sortBy, req.query.orderBy);
		if (status && status?.toString() !== '') {
			where.status = status?.toString();
		}
		if (statusWhenSoldOut && statusWhenSoldOut?.toString() !== '') {
			where.statusWhenSoldOut = statusWhenSoldOut?.toString();
		}
		if (brand && brand?.toString() !== '') {
			where.brandId = parseInt(brand?.toString(), 10);
		}
		if (supplier && supplier?.toString() !== '') {
			where.supplierId = parseInt(supplier?.toString(), 10);
		}
		if (search && search?.toString() !== '') {
			const searchCond: any = {
				[Op.or]: [
					Sequelize.literal(`product.item_number ilike '%${escapeChars(search.toString())}%'`),
					Sequelize.literal(`product.title ilike '%${escapeChars(search.toString())}%'`),
					Sequelize.literal(`product.ean ilike '%${escapeChars(search.toString())}%'`),
					Sequelize.literal(`product.customs_code ilike '%${escapeChars(search.toString())}%'`),
					Sequelize.literal(`brand.title ilike '%${escapeChars(search.toString())}%'`),
					Sequelize.literal(`supplier.title ilike '%${escapeChars(search.toString())}%'`),
				],
			};
			where = { ...where, ...searchCond };
		}

		const productList = await db.product.findAll({
			include: [
				{ model: db.productPrice },
				{ model: db.brand, required: true, all: true },
				{ model: db.supplier, required: true, all: true },
			],
			limit,
			offset,
			order,
			where,
		});
		const productListCount = await db.product.count({
			include: [
				{ model: db.brand, required: false },
				{ model: db.supplier, required: false },
			],
			where,
		});
		const response = getPagingData(
			{
				count: productListCount,
				rows: productList
			},
			Number(req.query.page),
			limit
		);
		return res.status(200).json(response);
	} catch (error) {
		return next(error);
	}
}

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

export async function getBrand(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const brands = await db.brand.findAll({
			attributes: ['id', 'title'],
		});
		return res.status(200).json(brands);
	} catch (error) {
		return next(error);
	}
}

export async function getStatus(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const distinctStatus = await db.product.findAll({
			attributes: [[fn('DISTINCT', col('status')), 'label']],
			where: { status: { [Op.not]: null } },
		});
		return res.status(200).json(distinctStatus);
	} catch (error) {
		return next(error);
	}
}
export async function getStatusWhenSoldOut(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const distinctStatusWhenSoldOut = await db.product.findAll({
			attributes: [[fn('DISTINCT', col('status_when_sold_out')), 'label']],
		});
		return res.status(200).json(distinctStatusWhenSoldOut);
	} catch (error) {
		return next(error);
	}
}

export async function getProductById(
	req: GetByIdRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = req.params;
		const product = await db.product.findByPk(id, {
			include: [
				{ model: db.productPrice },
				{ model: db.brand },
				{ model: db.supplier },
			],
		});
		if (!product) {
			throw notFound(`Product id - ${id} does not exist`);
		}
		return res.status(200).json(product);
	} catch (error) {
		return next(error);
	}
}
export async function searchProduct(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { val } = req.query;
		const searchCond = {
			[Op.or]: [
				{
					itemNumber: { [Op.iLike]: `%${val.toString()}%` },
				},
				{
					ean: { [Op.iLike]: `%${val.toString()}%` },
				},
				{
					title: { [Op.iLike]: `%${val.toString()}%` },
				},
			],
		};
		const products = await db.product.findAll({
			include: [{ model: db.productPrice, attributes: ['price', 'discount', 'discountType', 'currency', 'iso'] }],
			where: searchCond
		});
		return res.status(200).json(products);
	} catch (error) {
		return next(error);
	}
}
