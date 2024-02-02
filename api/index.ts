import express from 'express';

// import authRouter from './auth';
import companyRouter from './companies';
import customerRouter from './customers';
import orderRouter from './orders';
import orderStatusRouter from './order-status';
import paymentMethodRouter from './payment-method';
import syncRouter from './sync';
import usersRouter from './users';
import productRouter from './products';
import countryRouter from './countries';
import warrantyRouter from './warranties';
import warrantyProductErrorRouter from './warranty-product-errors';
import warrantyTagRouter from './warranty-tag';
import shipmentPriceRouter from './shipment-price';
import warrantyStatistics from './warranty-statistics';
import warrantyCompensation from './warranty-compensation';
import shipment from './shipment';
import feedback from './feedback';

const router = express.Router();

// router.use('/auth', authRouter);
router.use('/companies', companyRouter);
router.use('/customers', customerRouter);
router.use('/orders', orderRouter);
router.use('/order-status', orderStatusRouter);
router.use('/payment-method', paymentMethodRouter);
router.use('/sync', syncRouter);
router.use('/users', usersRouter);
router.use('/products', productRouter);
router.use('/countries', countryRouter);
router.use('/warranties', warrantyRouter);
router.use('/warranty-product-errors', warrantyProductErrorRouter);
router.use('/warranty-tag', warrantyTagRouter);
router.use('/shipment-price', shipmentPriceRouter);
router.use('/warranty-statistics', warrantyStatistics);
router.use('/warranty-compensation', warrantyCompensation);
router.use('/shipment', shipment);
router.use('/feedback', feedback);

export default router;
