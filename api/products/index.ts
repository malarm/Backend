import express from 'express';
import { validate } from 'lib/validator';
import {
	getAll, getsupplier, getProductById, getBrand, getStatus, getStatusWhenSoldOut, searchProduct
} from './controller';
import { searchSchema } from './schema';

const router = express.Router();

/* GET products listing. */
router.get('/', getAll);
router.get('/search', validate(searchSchema), searchProduct);
router.get('/suppliers', getsupplier);
router.get('/brands', getBrand);
router.get('/statuses', getStatus);
router.get('/statusWhenSoldOut', getStatusWhenSoldOut);
router.get('/:id', getProductById);

export default router;
