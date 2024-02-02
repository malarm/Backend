/* eslint-disable no-console */
import { CronJob } from 'cron';
import { format } from 'date-fns';
import { SupplierAttributes } from 'models/supplier';
import { BrandAttributes } from 'models/brand';
import { ProductAttributes } from 'models/product';
import { ProductResponseType, ProductSchema, CreateOrderType } from 'lib/schemas';
import { Static } from '@sinclair/typebox';
import { OrderAttributes } from 'models/order';
// import * as fs from 'fs';
import syncJob from '../../models/sync-job-index';
import { buildOrderModel, buildProductModel, ProductType } from '../pevino/pevinoHelper';
import {
	createWebshopOrder,
	updateWebshopOrderStatus,
	updateWebshopOrderComment,
	fetchLatestOrders,
	fetchLatestProducts,
	fetchProductById,
	fetchProductWithLimit,
} from '../pevino/pevino';
import { setupAjv } from '../validator';
import logger from '../../config/logger';



export const syncNewOrder = async (orderData: CreateOrderType) => {
	const orderId = await createWebshopOrder(orderData);
	return orderId;
};

export const updateOrderStatus = async (orderId: number, status: number) => {
	const orderResponse = await updateWebshopOrderStatus(orderId, status);
	return orderResponse;
};

export const updateOrderComment = async (orderId: number, comment: string) => {
	const orderResponse = await updateWebshopOrderComment(orderId, comment);
	return orderResponse;
};
