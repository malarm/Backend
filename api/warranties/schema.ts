import { IdSchema, PaginationSchema } from 'lib/schemas';
import { TypedRequest } from 'lib/types/express';
import { Type, Static } from '@sinclair/typebox';
import { UserAttributes } from 'models/user';
// import { any } from 'sequelize/types/lib/operators';

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

export const removeSchema = {
	params: IdSchema,
};

export type RemoveRequest = TypedRequest<{
	params: Static<typeof removeSchema.params>;
	user: UserAttributes;
}>;
export const createSchema = {
	body: Type.Object({
		orderId: Type.Number(),
		orderLines: Type.Array(
			Type.Object({
				brandId: Type.Integer(),
				supplierId: Type.Integer(),
				damageType: Type.Number(),
				amount: Type.Number(),
				itemNumber: Type.String(),
				title: Type.String(),
				productPricePayed: Type.Number(),
				discount: Type.Number(),
				errorDescription: Type.String(),
				serialNumber: Type.String(),
				// currency: Type.String(),
				calculatedBuyingPrice: Type.Number(),
			}),
		),
		customer: Type.Object({
			id: Type.Number(),
			firstName: Type.String(),
			lastName: Type.String(),
			address1: Type.String(),
			zipCode: Type.String(),
			city: Type.String(),
			country: Type.String(),
			countryCode: Type.Number(),
			mobile: Type.Optional(Type.String()),
			alternativePhone: Type.Optional(Type.String()),
			email: Type.String({ format: 'email' }),
			alternativeEmail: Type.Optional(Type.String()),
		}),
	}),
};
export type CreateRequest = TypedRequest<{
	body: Static<typeof createSchema.body>;
	user: UserAttributes;
}>;

export const createSchemaSolution = {
	body: Type.Object({
		warrantySolutionTypeId: Type.Number(),
		warrantyId: Type.Number(),
		warrantyProductId: Type.Number(),
	}),
};

export type CreateSolutionRequest = TypedRequest<{
	body: Static<typeof createSchemaSolution.body>;
	user: UserAttributes;
}>;

export const createSchemaOrderTechnician = {
	body: Type.Object({
		warrantySolutionId: Type.Number(),
		warrantyId: Type.Number(),
		technicianId: Type.Number(),
		subject: Type.String(),
		message: Type.String(),
	}),
};

export type UpdateOrderTechnicianRequest = TypedRequest<{
	body: Static<typeof createSchemaOrderTechnician.body>;
	user: UserAttributes;
}>;
export const createSchemaOrderTechnicianCost = {
	body: Type.Object({
		warrantySolutionId: Type.Number(),
		warrantyId: Type.Number(),
		costTechnician: Type.Number(),
		costSpareparts: Type.Number(),
		isFinalize: Type.Number(),
	}),
};

export type UpdateOrderTechnicianCostRequest = TypedRequest<{
	body: Static<typeof createSchemaOrderTechnicianCost.body>;
	user: UserAttributes;
}>;
export const createSchemaFinalizeAndReOpenSolution = {
	body: Type.Object({
		warrantyId: Type.Number(),
		warrantyProductId: Type.Number(),

	}),
};

export type FinalizeAndReOpenSolutionRequest = TypedRequest<{
	body: Static<typeof createSchemaFinalizeAndReOpenSolution.body>;
	user: UserAttributes;
}>;
export const createSchemaComment = {
	body: Type.Object({
		warrantyId: Type.Number(),
		warrantyActivityTypeId: Type.Number(),
		comment: Type.String(),

	}),
};

export type CreateCommentRequest = TypedRequest<{
	body: Static<typeof createSchemaComment.body>;
	user: UserAttributes;
}>;

export const deleteSolutionSchema = {
	params: IdSchema,
};

export type DeleteSolutionRequest = TypedRequest<{
	params: Static<typeof deleteSolutionSchema.params>;
	user: UserAttributes;
}>;

export const createSchemaCompensation = {
	body: Type.Object({
		warrantySolutionId: Type.Number(),
		warrantyId: Type.Number(),
		compensated: Type.Number(),
		isFinalize: Type.Number(),
	}),
};

export type UpdateCompensationAmountRequest = TypedRequest<{
	body: Static<typeof createSchemaCompensation.body>;
	user: UserAttributes;
}>;

export const createSchemaCredit = {
	body: Type.Object({
		warrantySolutionId: Type.Number(),
		warrantyId: Type.Number(),
		costReplace: Type.Number(),
		returnOrderId: Type.Optional(Type.Number()),
		costReturnShipping: Type.Number(),
		amountReturnToCustomer: Type.Number(),
		isEligibleToResale: Type.Boolean(),
		isFinalize: Type.Boolean(),
	}),
};

export type UpdateCreditAmountRequest = TypedRequest<{
	body: Static<typeof createSchemaCredit.body>;
	user: UserAttributes;
}>;

export const updateReplaceSchemaCompensation = {
	body: Type.Object({
		warrantySolutionId: Type.Number(),
		warrantyId: Type.Number(),
		isFinalize: Type.Number(),
		addZeroOrderToCustomer: Type.Boolean(),
		addReturnOrderToCustomer: Type.Boolean(),
		productId: Type.Optional(Type.Number()),
		newProductPriceCost: Type.Number(),
		newProductShipmentCost: Type.Number(),
		oldProductShipmentCost: Type.Number(),
	}),
};

export type UpdateReplaceAmountRequest = TypedRequest<{
	body: Static<typeof updateReplaceSchemaCompensation.body>;
	user: UserAttributes;
}>;

// export const uploadFileWarrantySchema = {
// body: Type.Object({
// warrantySolutionId: Type.Number(),
// warrantyId: Type.Number(),
// acceptedFiles: Type.Object(),
// }),
// };

// export type uploadFileWarrantySchema = TypedRequest<{
// body: Static<typeof uploadFileWarrantySchema.body>;
// }>;

export const createSchemaUpdateComment = {
	body: Type.Object({
		id: Type.Number(),
		comment: Type.String(),
	}),
};

export type UpdateCommentRequest = TypedRequest<{
	body: Static<typeof createSchemaUpdateComment.body>;
}>;

export interface WarrantySolution {
	warrantyProductId: number;
}

export interface Product {
	id: number;
	webshopId: number;
	itemNumber: string;
	title: string;
	calculatedBuyingPrice?: number;
}

export interface WarrantyProduct {
	amount: number;
	itemNumber: string;
	product: Product;
}

export interface Company {
	name: string;
}

export interface Country {
	vat: number;
}

export interface Customer {
	country: string;
	countries: Country[];
}

export interface Currency {
	id: number;
	currency: string;
}

export interface Order {
	webshopId: number;
	customerId: number;
	currency: string;
	deliveryMethod: string;
	deliveryCost: string;
	iso: string;
	siteId: string;
	orderComment: string;
	companyId: number;
	paymentMethodId: number;
	company: Company;
	customer: Customer;
	currencies: Currency[];
}

export interface WarrantyWebShopRequest {
	orderId: number;
	name: string;
	lastName: string;
	address: string;
	zipCode: string;
	city: string;
	country: string;
	countryCode: number;
	phone: string;
	email: string;
	warrantySolutions: WarrantySolution[];
	warrantyProducts: WarrantyProduct[];
	order: Order;
}

export interface OrderLineItemRequest {
	brandId: number;
	supplierId: number;
	damageType: number;
	amount: number;
	itemNumber: string;
	title: string;
	productPricePayed: number;
	discount: number;
	errorDescription: string;
	serialNumber: string;
	calculatedBuyingPrice: number;
}
