import express from 'express';
import { validate } from 'lib/validator';
import { find, getById, create, update, remove } from './controller';
import { createSchema, findSchema, getByIdSchema, removeSchema, updateSchema } from './schema';

const router = express.Router();

/* GET warrantyTag listing. */
router.get('/', validate(findSchema), find);
router.get('/:id', validate(getByIdSchema), getById);
router.post('/', validate(createSchema), create);
router.put('/:id', validate(updateSchema), update);
router.delete('/:id', validate(removeSchema), remove);

export default router;
