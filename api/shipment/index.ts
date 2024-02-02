import { secureRoute } from 'auth/auth.middleware';
import express from 'express';
import { validate } from 'lib/validator';
import {
	getOrderStatus,
	getOrdersForShipment,
	getPreRequisites,
	getShipmentData,
	// getCarrierConfig,
	bookShipping,
	getOrderByWebshopIds,
	getPreviousShipmentData,
	getShipmondoPrintLabels,
	getCalculationPrice,
	getShipmentPriceCountries,
	getTaricCodeText,
	getAllTaricCodes,
	getShipmondoProducts,
	getShipmondoCarriers,
	getShipmentById
	// getDropboyShipmentLabels
} from './controller';
import { createSchema, orderShipmentSchema, preRequisiteSchema, printOrderDataSchema, shipmentDataSchema, previousShipmentDataSchema, ShipmondoPrintSchema, CaculatePriceSchema } from './schema';

const router = express.Router();

/* GET shipment listing. */

router.get('/orderStatus', getOrderStatus);
router.get('/ordersForShipment', validate(orderShipmentSchema), getOrdersForShipment);
router.get('/preRequisites', validate(preRequisiteSchema), getPreRequisites);
router.get('/shipmentData', validate(shipmentDataSchema), getShipmentData);
router.get('/previousShipmentData', validate(previousShipmentDataSchema), getPreviousShipmentData);
// router.get('/carrierConfig', getCarrierConfig);
router.get('/calculationPrice', validate(CaculatePriceSchema), getCalculationPrice);
router.get('/shipmentPriceCountries', getShipmentPriceCountries);
router.post('/', secureRoute, validate(createSchema), bookShipping);
router.get('/printorders', validate(printOrderDataSchema), getOrderByWebshopIds);
router.get('/shipmondoPrintLabels', validate(ShipmondoPrintSchema), getShipmondoPrintLabels);
router.get('/taricCodeText', getTaricCodeText);
router.get('/allTaricCodes', getAllTaricCodes);
router.get('/productCodes', getShipmondoProducts);
router.get('/carriers', getShipmondoCarriers);
router.get('/:id', getShipmentById);
// router.get('/getDropboyShipmentLabels', getDropboyShipmentLabels);

export default router;
