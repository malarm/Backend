import { NextFunction, Request, Response } from 'express';
import { format } from 'date-fns';
import {
	syncOrdersByUpdated,
	syncProductsByUpdated,
	syncProduct,
	syncNewOrder
} from '../../lib/sync/webShopSync';
import { CreateRequest } from './schema';

export async function syncOrders(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { date = format(new Date(), 'yyyy-MM-dd') } = req.query;
		const orders = await syncOrdersByUpdated(date.toString());
		return res.status(200).json(orders);
	} catch (error) {
		return next(error);
	}
}

export const syncProducts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { date = format(new Date(), 'yyyy-MM-dd') } = req.query;
		const products = await syncProductsByUpdated(date.toString());
		return res.status(200).json(products);
	} catch (error) {
		return next(error);
	}
};

export const syncProductById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const product = await syncProduct(id.toString());
		return res.status(200).json(product);
	} catch (error) {
		return next(error);
	}
};

export const createNewOrder = async (req: CreateRequest, res: Response, next: NextFunction) => {
	try {
		const orderData = req.body;
		const orderIdResponse = await syncNewOrder(orderData);
		return res.status(200).json(orderIdResponse[0].Order_CreateResult);
	} catch (error) {
		return next(error);
	}
};
