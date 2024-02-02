import express from 'express';
import {
	getAll
} from './controller';

const router = express.Router();

/* GET countries listing. */
router.get('/', getAll);

export default router;
