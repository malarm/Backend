import express from 'express';
import { secureRoute } from 'auth/auth.middleware';
import { validate } from 'lib/validator';
import { syncOrders, syncProductById, syncProducts, createNewOrder } from './controller';
import { createSchema } from './schema';

const router = express.Router();

router.post('/orders', syncOrders);
router.post('/products', syncProducts);
router.post('/products/:id', syncProductById);
router.post('/orders/create', secureRoute, validate(createSchema), createNewOrder);
export default router;
