import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressWinston from 'express-winston';
import authPassport from './auth/auth';
import apiRouter from './api';
import logger from './config/logger';
import authRouter from './api/auth';

const app = express();

app.use(authPassport.initialize());
app.use(authPassport.session());
// logger
app.use(expressWinston.logger({
	winstonInstance: logger,
	meta: true,
	msg: 'HTTP {{req.method}} {{req.url}} - {{res.statusCode}} {{res.responseTime}}ms',
	expressFormat: false,
	colorize: false,
	ignoreRoute(req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);
app.use('/auth', authRouter);

// Error logger
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	// eslint-disable-next-line no-console
	console.error(err.stack);
	next(err);
});

// // Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const { statusCode } = err;
	res.status(statusCode || 500).send(err);
});

export default app;
