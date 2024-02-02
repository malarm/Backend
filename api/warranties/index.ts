import express from 'express';
import { secureRoute } from 'auth/auth.middleware';
import { validate } from 'lib/validator';
import {
	getAll,
	getCountries,
	getStatus,
	getAllWarrantyTags,
	getProductError,
	getWarrantyById,
	getWarrantyCompensation,
	getWarrantySolutionTypes,
	getWarrantyTechnicianNames,
	getUser,
	create,
	update,
	remove,
	updateTags,
	createSolution,
	updateOrderTechnician,
	updateOrderTechnicianCost,
	deleteSolution,
	finalizeSolution,
	reOpenSolution,
	createComment,
	getWarrantyActivity,
	updateComment,
	updateCompensationAmount,
	updateCreditAmount,
	updateReplaceAmount,
	warrantyUpload,
	warrantyUploadDelete
} from './controller';
import { findSchema, getByIdSchema, removeSchema, createSchema, createSchemaSolution, createSchemaOrderTechnician, createSchemaOrderTechnicianCost, createSchemaFinalizeAndReOpenSolution, createSchemaComment, deleteSolutionSchema, createSchemaCompensation, createSchemaCredit, updateReplaceSchemaCompensation, createSchemaUpdateComment } from './schema';
import { upload } from './fileupload';

const router = express.Router();

/* GET warranties listing. */
router.get('/', validate(findSchema), getAll);
router.get('/countries', getCountries);
router.get('/tags', getAllWarrantyTags);
router.get('/statuses', getStatus);
router.get('/productErrors', getProductError);
router.get('/compensations', getWarrantyCompensation);
router.get('/agent', getUser);
router.get('/solution/types', getWarrantySolutionTypes);
router.get('/technician/names', getWarrantyTechnicianNames);
router.get('/:id', validate(getByIdSchema), getWarrantyById);
router.post('/create', secureRoute, validate(createSchema), create);
router.post('/upload', secureRoute, upload, warrantyUpload);
router.post('/:id/solution', secureRoute, validate(createSchemaSolution), createSolution);
router.delete('/:id/deleteSolution', secureRoute, validate(deleteSolutionSchema), deleteSolution);
router.put('/:id/technician', secureRoute, validate(createSchemaOrderTechnician), updateOrderTechnician);
router.put('/:id/technician/cost', secureRoute, validate(createSchemaOrderTechnicianCost), updateOrderTechnicianCost);
router.put('/:id', update);
router.put('/:id/update/tags', updateTags);
router.delete('/:id', validate(removeSchema), secureRoute, remove);
router.put('/:id/finalizeSolution', secureRoute, validate(createSchemaFinalizeAndReOpenSolution), finalizeSolution);
router.put('/:id/reOpenSolution', secureRoute, validate(createSchemaFinalizeAndReOpenSolution), reOpenSolution);
router.post('/:id/create/comment', secureRoute, validate(createSchemaComment), createComment);
router.put('/:id/update/comment', secureRoute, validate(createSchemaUpdateComment), updateComment);
router.get('/:id/comment', getWarrantyActivity);
router.put('/:id/compensation/amount', secureRoute, validate(createSchemaCompensation), updateCompensationAmount);
router.put('/:id/credit/amount', secureRoute, validate(createSchemaCredit), updateCreditAmount);
router.put('/:id/replace/amount', secureRoute, validate(updateReplaceSchemaCompensation), updateReplaceAmount);
router.delete('/:id/deleteWarrantyUploadedFile', secureRoute, warrantyUploadDelete);

export default router;
