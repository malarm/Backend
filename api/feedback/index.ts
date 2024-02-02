import express from 'express';
import { validate } from 'lib/validator';
import {
	getQuestions,
	getQuestionById,
	getLanguages,
	addQuestion,
	updateQuestion,
	deleteQuestion,
	getStaticContent,
	updateStaticContent,
	createLanguage,
	updateLanguage,
	removeLanguage,
	getReviews,
} from './controller';
import { createQuestionSchema, getQuestionByIdSchema, updateQuestionSchema, getStaticContentSchema, updateStaticContentSchema, createLanguageSchema, updateLanguageSchema, removeLanguageSchema, ReviewGetSchema } from './schema';

const router = express.Router();

router.get('/getLanguages', getLanguages);
router.get('/getQuestions', getQuestions);
router.get('/getReviews', validate(ReviewGetSchema), getReviews);
router.get('/question/:id', validate(getQuestionByIdSchema), getQuestionById);
router.post('/questions', validate(createQuestionSchema), addQuestion);
router.put('/question/:id', validate(updateQuestionSchema), updateQuestion);
router.delete('/question/:id', deleteQuestion);
router.get('/staticContent', validate(getStaticContentSchema), getStaticContent);
router.post('/staticContent/update', validate(updateStaticContentSchema), updateStaticContent);

router.post('/language/create', validate(createLanguageSchema), createLanguage);
router.put('/language/update/:id', validate(updateLanguageSchema), updateLanguage);
router.delete('/language/:id', validate(removeLanguageSchema), removeLanguage);

export default router;
