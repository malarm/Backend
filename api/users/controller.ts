import { NextFunction, Request, Response } from 'express';
import db from '../../models/index';

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
	try {
		const { email } = req.body;
		const user = await db.user.findOne({ where: { email } });

		if (user) {
			return res.status(200).send(user);
		}

		const newUser = await db.user.create(req.body);

		return res.status(200).send(newUser);
	} catch (error) {
		return next(error);
	}
}

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
	try {
		const userList = await db.user.findAll();
		return res.status(200).json(userList);
	} catch (error) {
		return next(error);
	}
}

export async function getUserSetting(req: Request, res: Response, next: NextFunction) {
	try {
		const userId: number = req.user['id'];
		const settings = await db.userSetting.findOne({
			where: { userId }
		});
		return res.status(200).json(settings || {});
	} catch (error) {
		return next(error);
	}
}

export async function updateUserSetting(req: Request, res: Response, next: NextFunction) {
	try {
		const [record] = await db.userSetting.upsert({ ...req.body }, { returning: true });
		return res.status(200)
			.json(record ?? {});
	} catch (error) {
		return next(error);
	}
}
export async function update(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const [rowsUpdated, updatedValues] = await db.user
			.update(req.body, { where: { id }, returning: true });

		return res.status(200).json(rowsUpdated === 1 ? updatedValues[0] : {});
	} catch (error) {
		return next(error);
	}
}
