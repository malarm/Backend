import express from 'express';
import {
	getsupplier,
	warrantyStatisticsReport,
	warrantyStatisticsChart
} from './controller';

const router = express.Router();

/* GET warranties statistics listing. */
router.get('/suppliers', getsupplier);
router.get('/statistics', warrantyStatisticsReport);
router.get('/chart', warrantyStatisticsChart);

export default router;
