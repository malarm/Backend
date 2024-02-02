import { IdSchema, PaginationSchema } from 'lib/schemas';
import { TypedRequest } from 'lib/types/express';
import { Static, Type } from '@sinclair/typebox';

export const findSchema = {
	query: PaginationSchema,
};

export type FindRequest = TypedRequest<{
	query: Static<typeof findSchema.query>;
}>;

export const getByIdSchema = {
	params: IdSchema,
};

export type GetByIdRequest = TypedRequest<{
	params: Static<typeof getByIdSchema.params>;
}>;

export const createSchema = {
	body: Type.Object({
		countryId: Type.Number(),
		carrier: Type.String(),
		carrierProduct: Type.String(),
		maxZipcode: Type.String(),
		minZipcode: Type.String(),
		price: Type.Number(),
		minRunning: Type.Number(),
		maxRunning: Type.Number(),
		minWeight: Type.Number(),
		maxWeight: Type.Number(),
	})
};

export type CreateRequest = TypedRequest<{
	body: Static<typeof createSchema.body>
}>;

export const updateSchema = {
	params: IdSchema,
	body: Type.Object({
		countryId: Type.Optional(Type.Number()),
		carrier: Type.Optional(Type.String()),
		carrierProduct: Type.Optional(Type.String()),
		maxZipcode: Type.Optional(Type.String()),
		minZipcode: Type.Optional(Type.String()),
		price: Type.Optional(Type.Number()),
		minRunning: Type.Optional(Type.Number()),
		maxRunning: Type.Optional(Type.Number()),
		minWeight: Type.Optional(Type.Number()),
		maxWeight: Type.Optional(Type.Number()),
	})
};

export type UpdateRequest = TypedRequest<{
	params: Static<typeof updateSchema.params>
	body: Static<typeof updateSchema.body>
}>;

export const removeSchema = {
	params: IdSchema,
};

export type RemoveRequest = TypedRequest<{
	params: Static<typeof removeSchema.params>;
}>;
