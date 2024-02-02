import { IdSchema } from 'lib/schemas';
import { TypedRequest } from 'lib/types/express';
import { Static } from '@sinclair/typebox';

export const getByIdSchema = {
	params: IdSchema,
};

export type GetByIdRequest = TypedRequest<{
	params: Static<typeof getByIdSchema.params>;
}>;
