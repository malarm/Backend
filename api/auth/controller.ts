import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../../auth/authConfig';

export async function redirectHandler(req: any, res: Response, next: NextFunction) {
	const { dataValues: user } = req.user;
	const body = {
		id: user.id,
		email: user.email,
		name: user.name,
		initialName: user.initialName,
		phone: user.phone,
		jobTitle: user.jobTitle,
		officeLocation: user.officeLocation,
		preferredLanguage: user.preferredLanguage,
		roles: [],
	};
	const expiresAt = Math.floor(Date.now() / 1000) + (21600);

	const token = jwt.sign({ user: body, exp: expiresAt }, authConfig.tokenSecret);
	res.writeHead(301, { Location: `${authConfig.authCallbackUrl}?token=${token}` });
	return res.end();
}

export async function failureHandler(req: Request, res: Response, next: NextFunction) {
	res.status(500);
	res.json('Failure');
}
