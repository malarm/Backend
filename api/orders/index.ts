import express from 'express';
import {
	getAll, getIsoList, getOrderById, getOrderDetailsForCreateWarranty, getStatuses
} from './controller';

const router = express.Router();

/* GET orders listing. */
router.get('/', getAll);
router.get('/iso', getIsoList);
router.get('/statuses', getStatuses);
router.get('/:id', getOrderById);
router.get('/:id/warranty', getOrderDetailsForCreateWarranty);

export default router;
