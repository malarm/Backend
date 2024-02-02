/* eslint-disable no-console */
import { CronJob } from 'cron';
import { format } from 'date-fns';
import { padLeadingZeros } from 'utils/commonUtil';
import { Op } from 'sequelize';
import { Cargos, Goods, Shipment } from 'api/shipment/types';
import XMLWriter from 'xml-writer';
import fs from 'fs';
import logger from 'config/logger';
import db from '../models/index';

export const getInvoiceTotal = (shipments: Shipment[]) => {
	const arrayOfGoods = shipments.map((po) => po.goods);
	const allGoods = [].concat(...arrayOfGoods);
	return allGoods.reduce((total, good: Goods) => total + (good.unitValue * good.quantity), 0);
};
export const getGrossWeight = (shipments: Shipment[]) => {
	const arryOfCargos = shipments.map((po) => po.cargos);
	const allCargos = [].concat(...arryOfCargos);
	return allCargos.reduce((total, cargo: Cargos) => total + cargo.weight, 0);
};
export const getNoOfParcels = (shipments: Shipment[]) => {
	const arryOfCargos = shipments.map((po) => po.cargos);
	const allCargos = [].concat(...arryOfCargos);
	return allCargos.reduce((total, cargo: Cargos) => total + cargo.amount, 0);
};

