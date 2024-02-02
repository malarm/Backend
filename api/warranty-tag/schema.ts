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
		title: Type.String(),
		class: Type.String(),
	})
};

export type CreateRequest = TypedRequest<{
	body: Static<typeof createSchema.body>
}>;

export const updateSchema = {
	params: IdSchema,
	body: Type.Object({
		title: Type.Optional(Type.String()),
		class: Type.Optional(Type.String()),
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
