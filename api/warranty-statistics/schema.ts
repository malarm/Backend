export interface WarrantyStatisticsInstance {
	id: number;
	warrantyTagTypeId: null | string;
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
	status: number;
	orderDate: Date;
	orderFulfilledDate: null;
	dateCreated: Date;
	userId: number;
	agentId: null;
	dueDate: Date;
	archive: null;
	warrantyProducts: WarrantyStatisticsProduct[];
	order: StatisticsOrder;
}

export interface WarrantyCompensationInstance {
	id: number;
	warrantyId: number;
	brandId: number;
	supplierId: number;
	warrantyProductErrorId: number;
	amount?: number;
	itemNumber: string;
	title: string;
	productPricePayed: number;
	errorDescription?: string;
	compensationNeeded?: number;
	warrantyCompensationStatusId?: number;
	file?: string;
	serialNumber?: string;
	status?: number;
	dateCreated?: Date;
	errorResponsible?: string;
	currency?: string;
	calculatedBuyingPrice?: number;
	warrantyProducts: WarrantyStatisticsProduct[];
	order: StatisticsOrder;
}

export interface StatisticsOrder {
	orderDate: Date;
	orderUpdatedDate: Date;
	id: number;
	webshopId: number;
	customerId: number;
	currency: string;
	customerComment: string;
	deliveryName: string;
	deliveryAttention: string;
	deliveryAddress: string;
	deliveryZipCode: string;
	deliveryCountry: string;
	deliveryMethod: string;
	deliveryCost: string;
	invoiceNumber: null;
	iso: string;
	siteId: string;
	orderComment: string;
	vat: number;
	orderFulfilledDate: null;
	dueDate: null;
	dropPointId: string;
	dropPointIdLong: string;
	serviceType: string;
	companyId: number;
	paymentMethodId: number;
	createdAt: Date;
	updatedAt: Date;
	orderStatusId: number;
	orderLines: StatisticsOrderLine[];
}

export interface StatisticsOrderLine {
	id: number;
	itemNumber: string;
	orderId: number;
	amount: number;
	price: string;
	discount: string;
	createdAt: Date;
	updatedAt: Date;
	product: StatisticsProduct;
	supplier: StatisticsSupplier;
}

export interface WarrantyStatisticsProduct {
	id: number;
	warrantyId: number;
	brandId: number;
	supplierId: number;
	warrantyProductErrorId: number;
	amount: number;
	itemNumber: string;
	title: string;
	productPricePayed: string;
	errorDescription: string;
	compensationNeeded: number;
	warrantyCompensationStatusId: null;
	file: null;
	serialNumber: string;
	status: number;
	errorResponsible: null;
	dateCreated: Date;
	createdAt: Date;
	updatedAt: Date;
	warrantySolutions: WarrantyStatisticsSolution[];
	warrantyProductError: WarrantyStatisticsProductError;
	product: StatisticsProduct;
	supplier: StatisticsSupplier;
}

export interface StatisticsProduct {
	calculatedBuyingPrice: number;
	id: number;
	webshopId: number;
	itemNumber: string;
	title: string;
	variantId: number;
	recommendedPrice: string;
	price: string;
	discount: string;
	discountType: string;
	status: number;
	ean: string;
	customsCode: string;
	originCountry: string;
	stock: number;
	netWidth: number;
	netDepth: number;
	netHeight: number;
	netWeight: number;
	grossWidth: null;
	grossDepth: null;
	grossHeight: null;
	grossWeight: number | null;
	statusWhenSoldOut: number;
	buyWhenSoldOut: number;
	dateCreated: Date;
	dateUpdated: Date;
	createdAt: Date;
	updatedAt: Date;
	supplierId: number;
	brandId: number;
	supplier: StatisticsSupplier;
}

export interface WarrantyStatisticsProductError {
	id: number;
	title: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface WarrantyStatisticsSolution {
	costTech: number | null;
	costSpareparts: number | null;
	costReplace: number | null;
	costShipping: number | null;
	costReturnShipping: number | null;
	id: number;
	warrantySolutionTypeId: number;
	warrantyProductId: number;
	warrantyId: number;
	endedBy: number | null;
	userId: number;
	status: number;
	techId: number | null;
	ticketId: null;
	compensated: null;
	replaceOrderId: number | null;
	returnOrderId: number | null;
	dateCreated: Date;
	dateEnded: Date | null;
	dateAction: Date | null;
	createdAt: Date;
	updatedAt: Date;
	warrantySolutionType: WarrantyStatisticsSolutionType;
}

export interface WarrantyStatisticsSolutionType {
	id: number;
	title: string;
	default: number;
	canBeAd: number;
	final: number;
	allowAf: number;
	created: Date;
	updated: Date;
}

export interface StatisticsSupplier {
	id: number;
	title: string;
}

export interface StatisticsReport {
	supplier: string;
	items: StatisticsItems[];
	revenue: number;
	grossMargin: number;
	margin: number;
	soldItems: number;
	replacementCost: number;
	otherCost: number;
	marginAfterCosts: number;
	marginAfterCostsPercentage: number;
	warrantyItems: number;
	percentageOfWarrantyItems: number;
	replacementNewItems: number;
}

export interface StatisticsItems {
	itemNumber: string;
	revenue: number;
	soldItems: number;
	warrantyItems: number;
	percentageOfWarrantyItems: number;
}

export interface WarrantyStatisticsChart {
	date: string;
	warrantyItem: number;
}
