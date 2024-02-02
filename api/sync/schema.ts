import { TypedRequest } from 'lib/types/express';
import { CreateOrderType, OrderSchema } from 'lib/schemas';

export const createSchema = {
	body: OrderSchema
};

export type CreateRequest = TypedRequest<{
	body: CreateOrderType
}>;
