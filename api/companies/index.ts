import { secureRoute } from 'auth/auth.middleware';
import express from 'express';
import { validate } from 'lib/validator';
import { find, getById, create, update, remove } from './controller';
import { createSchema, findSchema, getByIdSchema, removeSchema, updateSchema } from './schema';

const router = express.Router();

/* GET company listing. */
router.get('/', secureRoute, validate(findSchema), find);
router.get('/:id', secureRoute, validate(getByIdSchema), getById);
router.post('/', secureRoute, validate(createSchema), create);
router.put('/:id', secureRoute, validate(updateSchema), update);
router.delete('/:id', secureRoute, validate(removeSchema), remove);

export default router;
