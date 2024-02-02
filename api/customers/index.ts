import express from 'express';
import { getAll, getCountries, getCustomerById } from './controller';

const router = express.Router();

/* GET customers listing. */
router.get('/', getAll);
router.get('/countries', getCountries);
router.get('/:id', getCustomerById);

export default router;
