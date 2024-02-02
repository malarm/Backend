import { Static, Type } from '@sinclair/typebox';
import { IdSchema, PaginationSchema } from 'lib/schemas';
import { TypedRequest } from 'lib/types/express';
import { UserAttributes } from 'models/user';

export const createQuestionSchema = {
	body: Type.Object({
		name: Type.String(),
		orderOfQuestion: Type.Optional(Type.Number()),
		isInDepth: Type.Boolean(),
		LocalizedQuestions: Type.Array(Type.Object({
			languageId: Type.Number(),
			question: Type.String(),
			subContent: Type.String(),
			commentLabel: Type.String(),
			commentPlaceholder: Type.String()
		}))
	})
};

export type CreateQuestionRequest = TypedRequest<{
	body: Static<typeof createQuestionSchema.body>;
	user: UserAttributes;
}>;

export const updateQuestionSchema = {
	body: Type.Object({
		id: Type.Number(),
		name: Type.String(),
		orderOfQuestion: Type.Optional(Type.Number()),
		isInDepth: Type.Boolean(),
		LocalizedQuestions: Type.Array(Type.Object({
			id: Type.Optional(Type.Number()),
			languageId: Type.Number(),
			question: Type.String(),
			subContent: Type.String(),
			commentLabel: Type.String(),
			commentPlaceholder: Type.String()
		}))
	})
};

export type UpdateQuestionRequest = TypedRequest<{
	body: Static<typeof updateQuestionSchema.body>;
	user: UserAttributes;
}>;

export const getQuestionByIdSchema = {
	params: IdSchema,
};

export type GetByQuestionIdRequest = TypedRequest<{
	params: Static<typeof getQuestionByIdSchema.params>;
}>;

// page static content

export const getStaticContentSchema = {
	query: PaginationSchema,
};

export type GetStaticContentRequest = TypedRequest<{
	query: Static<typeof getStaticContentSchema.query>;
}>;

/* export const getStaticContentByIdSchema = {
	params: IdSchema,
};

export type GetStaticContentByIdRequest = TypedRequest<{
	params: Static<typeof getStaticContentByIdSchema.params>;
}>; */

export const createStaticContentSchema = {
	body: Type.Object({
		id: Type.Number(),
		languageId: Type.Number(),
		headline: Type.String(),
		submit: Type.String(),
		submit2: Type.String(),
		continue: Type.String(),
		thankYouHeader: Type.String(),
		thankYouSubHeaderBadReview: Type.String(),
		thankYouSubHeaderGoodReview: Type.String(),
		thankYouSubHeaderGoodReviewShare: Type.String(),
		explainShare: Type.String(),
		priceRunner: Type.Optional(Type.String()),
		trustpilot: Type.Optional(Type.String()),
		google: Type.Optional(Type.String()),
		fackbook: Type.Optional(Type.String()),
		googleUrl: Type.Optional(Type.String()),

	})
};

export type CreateStaticContentRequest = TypedRequest<{
	body: Static<typeof createStaticContentSchema.body>
}>;

export const updateStaticContentSchema = {
	// params: IdSchema,
	body: Type.Array(Type.Object({
		id: Type.Optional(Type.Number()),
		languageId: Type.Optional(Type.Number()),
		headline: Type.Optional(Type.String()),
		submit: Type.Optional(Type.String()),
		submit2: Type.Optional(Type.String()),
		continue: Type.Optional(Type.String()),
		thankYouHeader: Type.Optional(Type.String()),
		thankYouSubHeaderBadReview: Type.Optional(Type.String()),
		thankYouSubHeaderGoodReview: Type.Optional(Type.String()),
		thankYouSubHeaderGoodReviewShare: Type.Optional(Type.String()),
		explainShare: Type.Optional(Type.String()),
		priceRunner: Type.Optional(Type.String()),
		trustpilot: Type.Optional(Type.String()),
		google: Type.Optional(Type.String()),
		fackbook: Type.Optional(Type.String()),
		googleUrl: Type.Optional(Type.String()),
	}))
};

export type UpdateStaticContentRequest = TypedRequest<{
	// params: Static<typeof updateStaticContentSchema.params>
	body: Static<typeof updateStaticContentSchema.body>
}>;

export const removeStaticContentSchema = {
	params: IdSchema,
};

export type RemoveStaticContentRequest = TypedRequest<{
	params: Static<typeof removeStaticContentSchema.params>;
}>;

export const createLanguageSchema = {
	body: Type.Object({
		code: Type.String(),
		description: Type.Optional(Type.String())
	})
};

export type CreateLanguageRequest = TypedRequest<{
	body: Static<typeof createLanguageSchema.body>
}>;

export const updateLanguageSchema = {
	params: IdSchema,
	body: Type.Object({
		code: Type.Optional(Type.String()),
		description: Type.Optional(Type.String())
	})
};

export type UpdateLanguageRequest = TypedRequest<{
	params: Static<typeof updateLanguageSchema.params>
	body: Static<typeof updateLanguageSchema.body>
}>;

export const removeLanguageSchema = {
	params: IdSchema,
};

export type RemoveLanguageRequest = TypedRequest<{
	params: Static<typeof removeLanguageSchema.params>;
}>;

export const ReviewGetSchema = {
	query: Type.Object({
		dateFrom: Type.Optional(Type.String()),
		dateTo: Type.Optional(Type.String()),
		searchText : Type.Optional(Type.String()),
		warrantyFilter: Type.Optional(Type.Number()),
	})
};

export type ReviewGetRequest = TypedRequest<{
	query: Static<typeof ReviewGetSchema.query>;
}>;
