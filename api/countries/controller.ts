import { NextFunction, Request, Response } from 'express';
import db from '../../models/index';

export async function getAll(req: Request, res: Response, next: NextFunction) {
	try {
		const countryList = await db.country.findAll({
			order: ['country'],
			attributes: ['id', 'country', 'countryCode', 'telephoneCode', 'iso', 'vat'],
			include: [
				{ model: db.deliveryMethod, attributes: ['id', 'title', 'deliveryPrice'] },
				{ model: db.currency, attributes: ['id', 'currency'] },
				{ model: db.paymentMethod, attributes: ['id', 'paymentMethodTitle', 'paymentMethodType'] },
			],
		});
		return res.status(200).json(countryList);
	} catch (error) {
		return next(error);
	}
}
