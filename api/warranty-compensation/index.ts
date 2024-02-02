import { validate } from 'lib/validator';
import express from 'express';
import {
	warrantyCompensationReport
} from './controller';
import { getWarrantyCompensationReportSchema } from './schema';

const router = express.Router();

/* GET warranties compensation listing. */
router.get('/report', validate(getWarrantyCompensationReportSchema), warrantyCompensationReport);
export default router;
