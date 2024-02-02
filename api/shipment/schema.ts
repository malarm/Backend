import { Static, Type } from '@sinclair/typebox';
import { TypedRequest } from 'lib/types/express';
import { UserAttributes } from 'models/user';

export const createSchema = {
	body: Type.Object({
		newShipment: Type.Object({
			estateInfo: Type.Array(Type.Object({
				quantity: Type.String(),
				type: Type.String(),
				item: Type.String(),
				height: Type.String(),
				width: Type.String(),
				depth: Type.String(),
				weight: Type.String(),
			})),
			goodsInfo: Type.Array(Type.Object({
				quantity: Type.String(),
				type: Type.String(),
				item: Type.String(),
				countryCode: Type.String(),
				customsCode: Type.String(),
				value: Type.String(),
				weight: Type.String(),
				currency: Type.String(),
			})),
			customerInfo: Type.Object({
				id: Type.Integer(),
				company: Type.String(),
				attention: Type.String(),
				address1: Type.String(),
				address2: Type.String(),
				email: Type.String(),
				mobile: Type.String(),
				city: Type.String(),
				zipCode: Type.String(),
				country: Type.String(),
				countryCode: Type.Integer(),
			}),
			deliveryInstruction: Type.String(),
			freightForwarder: Type.Object({
				id: Type.Integer(),
				showPickUp: Type.Boolean(),
				showDelivery: Type.Boolean(),
				showExtraService: Type.Boolean(),
				showExtraServiceFlex: Type.Boolean(),
				smsNt: Type.Boolean(),
				emailNt: Type.Boolean(),
				smsPnt: Type.Boolean(),
				emailPnt: Type.Boolean(),
				carrier: Type.Object({
					id: Type.Integer(),
					carrier: Type.String(),
					carrierCode: Type.String(),
					platform: Type.String(),
				}),
				country: Type.Object({
					id: Type.Integer(),
					country: Type.String(),
					iso: Type.String(),
					countryCode: Type.String(),
					telephoneCode: Type.Integer(),
					vat: Type.Integer(),
					currencyId: Type.Integer(),
				}),
			}),
			pickupDate: Type.String(),
			deliveryDate: Type.String(),
			deliveryTime: Type.String(),
			pickupTime: Type.String(),
			carryIn: Type.Boolean(),
			twoMen: Type.Boolean(),
			assemblyAndIns: Type.Boolean(),
			dispOfGL: Type.Boolean(),
			flexDel: Type.Boolean(),
			telNotf: Type.Boolean(),
			returnShip: Type.Boolean(),
			orderId: Type.Integer(),
			referenceNum: Type.Integer(),
		})
	})
};

export type BookShipmentRequest = TypedRequest<{
	body: Static<typeof createSchema.body>;
	user: UserAttributes;
}>;

export const orderShipmentSchema = {
	query: Type.Object({
		// orderStatus: Type.Array(Type.Number())
		orderStatus: Type.String()
	}),
};

export type OrderShipmentRequest = TypedRequest<{
	query: Static<typeof orderShipmentSchema.query>;
}>;

export const preRequisiteSchema = {
	query: Type.Object({
		orderId: Type.Integer()
	}),
};

export type PreRequisiteRequest = TypedRequest<{
	query: Static<typeof preRequisiteSchema.query>;
}>;

export const previousShipmentDataSchema = {
	query: Type.Object({
		search: Type.Optional(Type.String()),
		rowsPerPage: Type.Optional(Type.Integer()),
		page: Type.Optional(Type.Integer()),
	}),
};

export type PreviousShipmentDataRequest = TypedRequest<{
	query: Static<typeof previousShipmentDataSchema.query>;
}>;

export const shipmentDataSchema = {
	query: Type.Object({
		reportDate: Type.String()
	}),
};

export type ShipmentDataRequest = TypedRequest<{
	query: Static<typeof shipmentDataSchema.query>;
}>;

export const printOrderDataSchema = {
	query: Type.Object({
		webshopIds: Type.String()
	}),
};

export const CaculatePriceSchema = {
	query: Type.Object({
		country: Type.Integer(),
		zipcode: Type.Integer(),
		quantity: Type.Integer(),
		length: Type.Integer(),
		width: Type.Integer()
	}),
};

export type PrintOrderRequest = TypedRequest<{
	query: Static<typeof printOrderDataSchema.query>;
}>;

export const ShipmondoPrintSchema = {
	query: Type.Object({
		Ids: Type.String()
	}),
};

export type ShipmondoPrintRequest = TypedRequest<{
	query: Static<typeof ShipmondoPrintSchema.query>;
}>;

export type CaculatePriceRequest = TypedRequest<{
	query: Static<typeof CaculatePriceSchema.query>;
}>;

export const taricCodesSchema = {
	query: Type.Object({
		code: Type.String()
	}),
};

export type TaricCodeRequest = TypedRequest<{
	query: Static<typeof taricCodesSchema.query>;
}>;

export const shipmondoProductSchema = {
	query: Type.Object({
		receiver: Type.Optional(Type.String()),
		sender: Type.Optional(Type.String()),
		ownagreements: Type.Optional(Type.Boolean()),
		carrier: Type.Optional(Type.String()),
	}),
};

export type ShipmondoProductRequest = TypedRequest<{
	query: Static<typeof shipmondoProductSchema.query>;
}>;

export const shipmondoCarrierSchema = {
	query: Type.Object({
		country: Type.Optional(Type.String())
	}),
};

export type ShipmondoCarrierRequest = TypedRequest<{
	query: Static<typeof shipmondoCarrierSchema.query>;
}>;

export const DropboyShipmentLabelsSchema = {
	query: Type.Object({
		shipmentIds: Type.String(),
	}),
};

export type DropboyShipmentLabelsRequest = TypedRequest<{
	query: Static<typeof DropboyShipmentLabelsSchema.query>;
}>;
