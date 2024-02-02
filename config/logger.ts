import { createLogger, format, transports } from 'winston';

const env = process.env.NODE_ENV || 'development';

const devTransport = [
	new transports.Console(),
	new transports.File({ filename: 'applicationError.log', level: 'error' }),
	new transports.File({ filename: 'application.log' })];
const prodTransport = [
	new transports.File({ filename: 'applicationError.log', level: 'error' }),
	new transports.File({ filename: 'application.log' }),
];

const logger = createLogger({
	level: env !== 'production' ? 'debug' : 'info',
	format: format.combine(
		format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
		format.align(),
		format.printf((log) => `${log.level.toUpperCase()}: ${[log.timestamp]}: ${log.message}`),
	),
	transports: env !== 'production' ? devTransport : prodTransport
});
export default logger;
