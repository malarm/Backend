export interface ShipmentData {
	webshopId: number;
	deliveryName: string;
	deliveryAttention: string;
	deliveryAddress: string;
	deliveryAddress2: string;
	deliveryZipCode: string;
	deliveryCity: string;
	deliveryCountry: string
	customer: {
		firstName: string;
		lastName: string;
		address1: string;
		address2: string;
		zipCode: string;
		city: string;
		country: string;
		company: string;
	};
	deliveryMethodId: number;
	paymentMethodId
	deliveryMethod: {
		logo: string;
		title: string;
	};
	paymentMethod: {
		paymentMethodTitle: string;
		logo: string;
	};
}
export interface EstateInfo {
	quantity: string;
	type: string;
	item: string;
	height: string;
	width: string;
	depth: string;
	weight: string;
}

export interface GoodsInfo {
	quantity: string;
	type: string;
	itemNumber: string;
	item: string;
	countryCode: string;
	customsCode: string;
	value: string;
	weight: string;
	currency: string;
}

export interface ShipmentCarrier {
	id: number;
	carrier: string;
	carrierProduct: string;
	showPickUp: boolean;
	showDelivery: boolean;
	showExtraService: boolean;
	smsNt: boolean;
	emailNt: boolean;
	smsPnt: boolean;
	emailPnt: boolean;
}

export interface Shipment {
	id: number;
	shipmentDate: Date,
	returnStatus: boolean,
	companyName: string;
	customerName: string;
	customerAddress: string;
	customerExtraAddress: string;
	customerZipcode: string;
	customerCity: string;
	customerCountry: string;
	customerEmail: string;
	customerPhone: string;
	deliveryInstruction: string;
	originCompanyName: string;
	originName: string;
	originAddress: string;
	originExtraInfo: string;
	originZipCode: string;
	originCity: string;
	originCountry: string;
	originEmail: string;
	originPhonePrefix: string;
	originPhoneNumber: string;
	originTimeWindowStart: Date;
	originTimeWindowEnd: Date;
	timeWindowStart: Date;
	timeWindowEnd: Date;
	services: string;
	flexLiability: boolean;
	phoneNotification: boolean;
	cargos: Cargos[];
	goods: Goods[];
	carrierCountryConfig: CarrierCountryConfig;
	orderId: number;
	order: Order;
	tracktrace: string;
	platformId: string;
	externalCarrierId: string;
}

export interface Order {
	currency: string;
}

export interface Goods {
	id: number;
	shipmentId: number,
	quantity?: number;
	countryCode?: string;
	title?: string;
	customsCode?: string;
	unitValue?: number;
	weight?: number;
	itemNumber?: string;
}

export interface Cargos {
	amount: number;
	description: string;
	width: number;
	height: number;
	depth: number;
	weight: number;
}

export interface CarrierCountryConfig {
	carrierProduct: string;
	smsNt: boolean;
	emailNt: boolean;
	smsPnt: boolean;
	emailPnt: boolean;
	privateAddress: boolean;
	carrier: ShipCarrier;
}

export interface ShipCarrier {
	id: number;
	carrier: string;
	platform: string;
}

export interface ShipmondoResponse {
	id: number;
	created_at: string;
	updated_at: string;
	carrier_code: string;
	description?: string;
	contents?: string;
	product_id: number;
	services?: string;
	product_code: string;
	service_codes: string;
	price: string;
	reference: string;
	// order_id?: number;
	pkg_no?: string;
	receiver: Receiver;
	sender: Sender;
	parcels: Parcel[];
	// service_point: ServicePoint;
	// pick_up: PickUp;
	// bill_to: BillTo;
	paperless_trade: boolean;
	// pallet_exchange: PalletExchange;
	source_id?: string;
	source_type: string;
	labels: Label[];
	error: string;
}

export interface ShipmondoPrintLabelsResponse {
	id: number;
	labels: Label[];
}

export interface Receiver {
	name: string;
	attention: string;
	address1: string;
	address2: string;
	zipcode: string;
	city: string;
	country_code: string;
	vat_id?: string;
	email: string;
	mobile: string;
	telephone: string;
	instruction?: string;
	/* access_code?: string;
		date?: string;
		from_time?: string;
		to_time?: string; */
}

export interface Sender {
	name: string;
	attention: string;
	address1: string;
	address2: string;
	zipcode: string;
	city: string;
	country_code: string;
	vat_id?: string;
	email: string;
	mobile: string;
	telephone: string;
}

export interface Parcel {
	quantity: number;
	weight: number;
	/* content?: any;
	package_type?: any; */
	pkg_no?: string;
	pkg_nos: string[];
	weight_kg: string;
	// dangerous_goods: object[];
	height: number;
	width: number;
	length: number;
	/* volume: number;
	running_metre: number; */
}

// export interface ServicePoint { }

/* export interface PickUp {
	name?: string;
	attention?: string;
	address1?: string;
	address2?: string;
	zipcode?: string;
	city?: string;
	country_code?: string;
	telephone?: string;
	phone?: string;
	date?: string;
	instruction?: string;
	from_time?: any;
	to_time?: any;
	pickup_custom: boolean;
} */

/* export interface BillTo {
	name?: string;
	attention?: string;
	address1?: string;
	address2?: string;
	zipcode?: string;
	city?: string;
	country_code?: string;
	vat_id?: string;
	telephone?: string;
	mobile?: string;
	email?: string;
	bill_to_custom: boolean;
} */

/* export interface PalletExchange {
	pallets1?: string;
	pallets2?: string;
	pallets4?: string;
} */

export interface Label {
	base64: string;
	file_format: string;
}

export interface CalculateShipmentPrice {
	price: number,
	carrierProduct: string,
	country: CalculateShipmentCountry
}

export interface CalculateShipmentCountry {
	countryCode: string,
	id: number,
	country: string;
}
export interface ShipmondoProductCodeResponse {
	code: string
	id: number
	name: string
	available: boolean
	own_agreement_available: boolean
	available_customer_numbers: AvailableCustomerNumber[]
	customs_declaration_required: boolean
	service_point_available: boolean
	service_point_required: boolean
	sender_country_code: string
	receiver_country_code: string
	expected_transit_time?: string
	required_fields?: string
	optional_fields?: string
	required_parcel_fields: string
	optional_parcel_fields?: string
	delivery_location_type?: string
	carrier: Carrier
	destination_country: DestinationCountry
	available_services: AvailableService[]
	required_services: RequiredService[]
	weight_intervals: WeightInterval[]
}

export interface AvailableCustomerNumber {
	customer_number: string
}

export interface Carrier {
	id: number
	code: string
	name: string
}

export interface DestinationCountry {
	code: string
	name: string
	customs_declaration_required: boolean
}

export interface AvailableService {
	code: string
	id: number
	name: string
	required_fields?: string
	optional_fields: any
	own_agreement_required: boolean
}

export interface RequiredService {
	code: string
	id: number
	name: string
	required_fields: string
	optional_fields: any
	note: string
}

export interface WeightInterval {
	from_weight: number
	to_weight: number
	description: string
}

export interface DropBoyGetOrderResponse {
	success: boolean
	errors: string[] | null
	result: DropBoyOrder[]
	info: Info
}

export interface DropBoyOrder {
	_id: string
	tntKey: string
	orderNumber: string
}

export interface DropBoyResponse {
	success: boolean
	errors: string[] | null
	result: Result
	info: Info
}

export interface Result {
	batchFileId: string
}

export interface Info {
	skip: number
	take: number
	count: boolean
	export: boolean
	active: boolean
}
