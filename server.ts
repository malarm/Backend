/* eslint-disable no-console */
import app from './app';
import { initPevino } from './lib/pevino/pevino';
import { syncOrderJob, syncProductJob, syncProductByLimitJob } from './lib/sync/webShopSync';
import logger from './config/logger';
import { createAndSendNorwayPostNordOrdersXML } from 'lib/jobs';

async function start() {
	logger.info('Initializing Pevindo - started');
	await initPevino();
	logger.info('Initializing Pevindo - Done');
	return app;
}

start()
	// eslint-disable-next-line @typescript-eslint/no-shadow
	.then((app) => {
		app.listen(3090, () => {
			logger.info('listening to port 3090....');
			// createAndSendNorwayPostNordOrdersXML.start();
			// syncOrderJob.start();
			/* syncProductJob.start();
			syncProductByLimitJob.start(); */
		});
	})
	.catch((ex) => {
		logger.error('Error booting server');
		throw ex;
	});
