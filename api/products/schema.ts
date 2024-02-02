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

export const searchSchema = {
	query: Type.Object({
		val: Type.String()
	}),
};

export type SearchRequest = TypedRequest<{
	query: Static<typeof searchSchema.query>;
}>;
