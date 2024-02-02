import { NextFunction, Request, Response } from 'express';
import { Op, Sequelize, WhereOptions } from 'sequelize';
import { notFound } from '@jdpnielsen/http-error';
import db from '../../models/index';
import { CreateQuestionRequest, GetByQuestionIdRequest, UpdateQuestionRequest, UpdateStaticContentRequest, CreateLanguageRequest, UpdateLanguageRequest, RemoveLanguageRequest, GetStaticContentRequest, ReviewGetRequest } from './schema';
import logger from '../../config/logger';
import { ReviewOutput } from './types';
import { escapeChars } from 'utils/messageUtil';

export async function getQuestions(req: Request, res: Response, next: NextFunction) {
	try {
		const activeQuestions = await db.questions.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt', 'dateCreated'] },
			where: { deleted: { [Op.not]: true } },
			order: [['id', 'asc']]
		});
		return res.status(200).json(activeQuestions);
	} catch (error) {
		return next(error);
	}
}

export async function getQuestionById(req: GetByQuestionIdRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const question = await db.questions.findByPk(id, {
			include: [{ model: db.questionsLocalisation, include: [{ model: db.language }] }]
		});
		if (!question) {
			throw notFound(`Question id - ${id} not Found`);
		}
		return res.status(200).json(question);
	} catch (error) {
		return next(error);
	}
}

export async function getLanguages(req: Request, res: Response, next: NextFunction) {
	try {
		const languages = await db.language.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt', 'dateCreated'] }
		});
		return res.status(200).json(languages);
	} catch (error) {
		return next(error);
	}
}

export async function createLanguage(req: CreateLanguageRequest, res: Response, next: NextFunction) {
	try {
		const language = await db.language.create(req.body);
		return res.status(201).json(language);
	} catch (error) {
		return next(error);
	}
}

export async function updateLanguage(req: UpdateLanguageRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const [rowsUpdated, updatedValues] = await db.language
			.update(req.body, { where: { id }, returning: true });

		return res.status(200).json(rowsUpdated === 1 ? updatedValues[0] : {});
	} catch (error) {
		return next(error);
	}
}

export async function removeLanguage(req: RemoveLanguageRequest, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await db.language.destroy({ where: { id } });
		return res.status(200).json({});
	} catch (error) {
		return next(error);
	}
}

export async function addQuestion(req: CreateQuestionRequest, res: Response, next: NextFunction) {
	try {
		const question = {
			name: req.body.name,
			orderOfQuestion: req.body.orderOfQuestion,
			isInDepth: req.body.isInDepth,
			deleted: false,
			dateCreated: new Date()
		};

		const result = await db.questions.create(question);
		logger.info(`Question record created successfully. id=${result.id}`);

		for (const localQuest of req.body.LocalizedQuestions) {
			const localizedQuestion = {
				questionId: result.id,
				languageId: localQuest.languageId,
				question: localQuest.question,
				subContent: localQuest.subContent,
				commentLabel: localQuest.commentLabel,
				commentPlaceholder: localQuest.commentPlaceholder
			};
			const lQuestionResults = await db.questionsLocalisation.create(localizedQuestion);
			logger.info(`Question Localized record created successfully. id=${lQuestionResults.id}`);
		}

		return res.status(200).json({ isSuccess: true, message: 'Question created Successfully' });
	} catch (error) {
		return next(error);
	}
}

export async function updateQuestion(req: UpdateQuestionRequest, res: Response, next: NextFunction) {
	try {
		const question = await db.questions.findByPk(req.body.id);
		if (question === null) {
			return res.status(404).json({
				isSuccess: false,
				error: { message: 'question not found' }
			});
		}
		const updateValues = {
			name: req.body.name,
			orderOfQuestion: req.body.orderOfQuestion,
			isInDepth: req.body.isInDepth
		};
		await db.questions.update(updateValues, { where: { id: req.body.id } });
		logger.info(`Question record updated successfully. id:${req.body.id}`);

		for (const localQuest of req.body.LocalizedQuestions) {
			if (localQuest.id == null) {
				const localizedQuestion = {
					questionId: req.body.id,
					languageId: localQuest.languageId,
					question: localQuest.question,
					subContent: localQuest.subContent,
					commentLabel: localQuest.commentLabel,
					commentPlaceholder: localQuest.commentPlaceholder
				};
				await db.questionsLocalisation.create(localizedQuestion);
			} else {
				const localQuestion = await db.questionsLocalisation.findByPk(localQuest.id);
				const localizedQuestion = {
					question: localQuest.question,
					subContent: localQuest.subContent,
					commentLabel: localQuest.commentLabel,
					commentPlaceholder: localQuest.commentPlaceholder
				};
				await db.questionsLocalisation.update(localizedQuestion, { where: { id: localQuestion.id } });
				logger.info(`Question Localized record updated successfully. id=${localQuestion.id}`);
			}
		}

		return res.status(200).json({ isSuccess: true, message: 'Question updated Successfully' });
	} catch (error) {
		return next(error);
	}
}

export async function deleteQuestion(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const question = await db.questions.findByPk(Number(id));
		if (question === null) {
			return res.status(400).json({
				isSuccess: false,
				error: { message: 'questionId is invalid' }
			});
		}
		await db.questions.update({ deleted: true }, { where: { id } });
		logger.info(`Question record marked as deleted successfully. id:${id}`);
		return res.status(200).json({ isSuccess: true, message: 'Question marked as deleted Successfully' });
	} catch (error) {
		return next(error);
	}
}

// page static content

export async function getStaticContent(req: GetStaticContentRequest, res: Response, next: NextFunction) {
	try {
		const StaticContentList = await db.reviewPageStaticContent.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] }
		});
		return res.status(200).json(StaticContentList);
	} catch (error) {
		return next(error);
	}
}

export async function updateStaticContent(req: UpdateStaticContentRequest, res: Response, next: NextFunction) {
	try {
		// const { id } = req.params;
		for (const element of req.body) {
			const isExists = await db.reviewPageStaticContent.findOne({
				where: { languageId: element.languageId }
			});
			const elementToInsert = {
				languageId: element.languageId,
				headline: element.headline,
				submit: element.submit,
				submit2: element.submit2,
				continue: element.continue,
				thankYouHeader: element.thankYouHeader,
				thankYouSubHeaderBadReview: element.thankYouSubHeaderBadReview,
				thankYouSubHeaderGoodReview: element.thankYouSubHeaderGoodReview,
				thankYouSubHeaderGoodReviewShare: element.thankYouSubHeaderGoodReviewShare,
				explainShare: element.explainShare,
				priceRunner: element.priceRunner,
				trustpilot: element.trustpilot,
				google: element.google,
				fackbook: element.fackbook,
				googleUrl: element.googleUrl,
			};

			if (isExists == null) {
				await db.reviewPageStaticContent.create(elementToInsert);
			} else {
				await db.reviewPageStaticContent
					.update(elementToInsert, { where: { languageId: element.languageId } });
			}
		}
		const data = await db.reviewPageStaticContent.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] }
		});
		return res.status(200).json(data);
	} catch (error) {
		return next(error);
	}
}

export async function getReviews(req: ReviewGetRequest, res: Response, next: NextFunction) {
	const { dateFrom, dateTo, searchText } = req.query;

	const dateFromDate = new Date(dateFrom);
	const dateToDate = new Date(new Date(dateTo).getTime() + (1 * 24 * 60 * 60 * 1000));
	let whereCond: WhereOptions = {
		dateCreated: { [Op.gt]: dateFromDate, [Op.lt]: dateToDate }
	};
	// if (searchText && searchText?.toString() !== '') {
	// 	const searchCond: any = {
	// 		[Op.or]: [
	// 			Sequelize.literal(`reivew.agentComment ilike '%${escapeChars(searchText.toString())}%'`),
	// 			Sequelize.literal(`reivew.platform ilike '%${escapeChars(searchText.toString())}%'`),
	// 			Sequelize.literal(`product.ean ilike '%${escapeChars(searchText.toString())}%'`),
	// 			Sequelize.literal(`product.customs_code ilike '%${escapeChars(searchText.toString())}%'`),
	// 			Sequelize.literal(`brand.title ilike '%${escapeChars(searchText.toString())}%'`),
	// 			Sequelize.literal(`supplier.title ilike '%${escapeChars(searchText.toString())}%'`),
	// 		],
	// 	};
	// 	whereCond = { ...whereCond, ...searchCond };
	// }
	const reviews = (await db.review.findAll({
		include: [
			{
				model: db.reviewDetail, include: [
					{ model: db.questions },
					{ model: db.questionsLocalisation }
				]
			},
			{
				model: db.warranty,
				include: [
					{
						model: db.warrantyProducts
					}
				]
			}
		],
		where: whereCond
	})).map(x => x as unknown as ReviewOutput);

	const reviewArray = [];

	for (const review of reviews) {
		const output = {
			orderId: review.orderId,
			updated: review.updatedAt,
			service: '',
			serviceProducts: review.warranty.warrantyProducts[0].itemNumber,
			reviewDetails: review.reviewDetails.map(x => {
				return {
					question: x.question.name,
					comment: x.comment,
					rating: x.rating
				};
			}),
			totalScore: (10 * review.reviewDetails.reduce((acc, val) => val.rating + acc, 0)) / review.reviewDetails.length,
			agentComment: review.agentComment,
			platform: review.platform,
			commentedDate: review.updatedAt
		};

		reviewArray.push(output);
	}

	return res.status(200).json(reviewArray);
}
