import { Static, Type } from '@sinclair/typebox';

export const ORDER_BY = ['ASC', 'DESC'] as const;
export type OrderBy = typeof ORDER_BY[number];

export const PaginationSchema = Type.Object({
	sortBy: Type.Optional(Type.String()),
	orderBy: Type.Optional(Type.Union(ORDER_BY.map((e) => Type.Literal(e)), { default: ORDER_BY[0] })),
	page: Type.Optional(Type.Integer({ default: 0 })),
	size: Type.Optional(Type.Integer({ default: 10 })),
	search: Type.Optional(Type.String()),
	brand: Type.Optional(Type.String()),
	status: Type.Optional(Type.String()),
	supplier: Type.Optional(Type.String()),
	statusWhenSoldOut: Type.Optional(Type.String()),
	country: Type.Optional(Type.String()),
	tag: Type.Optional(Type.String()),
	productError: Type.Optional(Type.String()),
});

export const IdSchema = Type.Object({
	id: Type.Integer(),
});

export const ProductVariantSchema = Type.Object({
	Id: Type.Integer(),
	ItemNumberSupplier: Type.String(),
	ItemNumber: Type.String(),
	Title: Type.String(),
	Price: Type.Number(),
	Status: Type.Boolean(),
	Ean: Type.String(),
	Stock: Type.Integer(),
	StockLow: Type.Integer(),
	Discount: Type.Number(),
});

export const ProductDiscountSchema = Type.Object({
	Id: Type.Integer(),
	Amount: Type.Integer(),
	Discount: Type.Number(),
	Price: Type.Number(),
	Currency: Type.String(),
	Language: Type.String(),
	ProductId: Type.Integer(),
	ProductVariantId: Type.Integer(),
	DiscountType: Type.String(),
});

export const ProductCustomDataSchema = Type.Object({
	Id: Type.Integer(),
	LanguageISO: Type.String(),
	ProductCustomId: Type.Integer(),
	ProductCustomIds: Type.String(),
	ProductCustomTypeId: Type.Integer(),
	Sorting: Type.Integer(),
	Title: Type.String(),
});

export const ProductSchema = Type.Object({
	Id: Type.Integer(),
	ProducerId: Type.Integer(),
	ItemNumberSupplier: Type.String(),
	ItemNumber: Type.String(),
	Title: Type.String(),
	Variants: Type.Union([Type.Null(), Type.Object({ item: Type.Array(ProductVariantSchema) })]),
	Price: Type.Number(),
	GuidelinePrice: Type.Number(),
	Discount: Type.Number(),
	DiscountType: Type.String(),
	BuyingPrice: Type.Number(),
	Status: Type.Boolean(),
	Ean: Type.String(),
	Stock: Type.Integer(),
	DisableOnEmpty: Type.Boolean(),
	OutOfStockBuy: Type.String(),
	DateCreated: Type.String(),
	DateUpdated: Type.String(),
	Discounts: Type.Object({ item: Type.Array(ProductDiscountSchema) }),
	CustomData: Type.Object({ item: Type.Array(ProductCustomDataSchema) }),
});

export type ProductResponseType = {
	item: Array<Static<typeof ProductSchema>>,
};

export const ProductsSchema = Type.Array(ProductSchema);

export const OrderCustomerSchema = Type.Object({
	CountryCode: Type.Integer(),
	Country: Type.String(),
	Company: Type.String(),
	Cvr: Type.String(),
	Firstname: Type.String(),
	Lastname: Type.String(),
	Email: Type.String(),
	Address: Type.String(),
	Address2: Type.String(),
	City: Type.String(),
	Zip: Type.String(),
	Phone: Type.String(),
	State: Type.String(),
});
export const OrderLinesSchema = Type.Object({
	Amount: Type.Union([Type.String(), Type.Number()]),
	BuyPrice: Type.Union([Type.String(), Type.Number()]),
	Discount: Type.Union([Type.String(), Type.Number()]),
	Price: Type.Union([Type.String(), Type.Number()]),
	ProductId: Type.Union([Type.String(), Type.Number()]),
	Unit: Type.String(),
	variantId: Type.Optional(Type.Union([Type.String(), Type.Number()])),
});

export const OrderSchema = Type.Object({
	CurrencyId: Type.Integer(),
	LanguageISO: Type.String(),
	CustomerComment: Type.String(),
	DeliveryComment: Type.String(),
	DeliveryPrice: Type.Union([Type.Number(), Type.String()]),
	PaymentId: Type.Integer(),
	DeliveryId: Type.Integer(),
	ReferenceNumber: Type.String(),
	SiteId: Type.String(),
	Origin: Type.String(),
	OrderCustomer: OrderCustomerSchema,
	OrderLines: Type.Union([Type.Null(), Type.Object({ item: Type.Array(OrderLinesSchema) })]),
});

export type CreateOrderType = Static<typeof OrderSchema>;

export type OrderResponseType = {
	item: Array<Static<typeof OrderSchema>>,
};

export const WarrantyCompensationReportSchema = Type.Object({
	startDate: Type.Optional(Type.String()),
	endDate: Type.Optional(Type.String()),
	comparisonType: Type.Optional(Type.String()),
	isUnlimitedDate: Type.Optional(Type.Boolean()),
	errorCodes: Type.Optional(Type.String())
});
