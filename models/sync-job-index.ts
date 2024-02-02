import { Sequelize, DataTypes } from 'sequelize';
import user from './user';
import userSetting from './userSetting';
import company from './company';
import * as configs from '../config/config';
import order from './order';
import customer from './customer';
import paymentMethod from './paymentMethod';
import orderStatus from './orderStatus';
import orderLine from './orderLine';
import supplier from './supplier';
import brand from './brand';
import productPrice from './productPrice';
import currency from './currency';
import product from './product';
import jobStatus from './jobStatus';
import deliveryMethod from './deliveryMethod';
import deliveryCountry from './deliveryCountries';
import country from './country';
import logger from '../config/logger';
import warranty from './warranties';
import warrantyProducts from './warrantyProducts';
import warrantyTagType from './warrantyTagType';
import warrantyProductError from './warrantyProductError';
import warrantySolution from './warrantySolution';
import warrantyActivities from './warrantyActivities';
import warrantyActivityType from './warrantyActivityType';
import warrantySolutionType from './warrantySolutionType';
import technician from './technicians';
import shipmentPrice from './shipmentPrice';
import shipment from './shipment';
import warrantyCompensationStatus from './warrantyCompensationStatus';
import warrantyPicturesUpload from './warrantyPicturesUpload';
import carrier from './carrier';
import cargo from './cargo';
import carrierCountryConfig from './carrierCountryConfig';
import goods from './goods';
import skanlogSeHub from './skanlogSeHub';

const env = process.env.NODE_ENV || 'development';
const config = configs[env];
config.logging = (msg) => logger.debug(msg);

let sequelize: Sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = {
	user: user(sequelize, DataTypes),
	userSetting: userSetting(sequelize, DataTypes),
	company: company(sequelize, DataTypes),
	orderStatus: orderStatus(sequelize, DataTypes),
	customer: customer(sequelize, DataTypes),
	paymentMethod: paymentMethod(sequelize, DataTypes),
	order: order(sequelize, DataTypes),
	orderLine: orderLine(sequelize, DataTypes),
	supplier: supplier(sequelize, DataTypes),
	brand: brand(sequelize, DataTypes),
	productPrice: productPrice(sequelize, DataTypes),
	product: product(sequelize, DataTypes),
	jobStatus: jobStatus(sequelize, DataTypes),
	deliveryCountry: deliveryCountry(sequelize, DataTypes),
	deliveryMethod: deliveryMethod(sequelize, DataTypes),
	country: country(sequelize, DataTypes),
	currency: currency(sequelize, DataTypes),
	warranty: warranty(sequelize, DataTypes),
	warrantyProducts: warrantyProducts(sequelize, DataTypes),
	warrantyTagType: warrantyTagType(sequelize, DataTypes),
	warrantyProductError: warrantyProductError(sequelize, DataTypes),
	warrantySolution: warrantySolution(sequelize, DataTypes),
	warrantyActivities: warrantyActivities(sequelize, DataTypes),
	warrantyActivityType: warrantyActivityType(sequelize, DataTypes),
	warrantySolutionType: warrantySolutionType(sequelize, DataTypes),
	technician: technician(sequelize, DataTypes),
	shipmentPrice: shipmentPrice(sequelize, DataTypes),
	warrantyCompensationStatus: warrantyCompensationStatus(sequelize, DataTypes),
	warrantyPicturesUpload: warrantyPicturesUpload(sequelize, DataTypes),
	shipment: shipment(sequelize, DataTypes),
	carrier: carrier(sequelize, DataTypes),
	cargo: cargo(sequelize, DataTypes),
	goods: goods(sequelize, DataTypes),
	carrierCountryConfig: carrierCountryConfig(sequelize, DataTypes),
	skanlogSeHub: skanlogSeHub(sequelize, DataTypes),
};

const db = {
	...models,
	sequelize,
	Sequelize
};

Object.keys(models).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

export default db;
