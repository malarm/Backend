import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface ShipmentPriceAttributes {
	id: number;
	countryId: number;
	carrier: string;
	carrierProduct: string;
	maxZipcode: string;
	minZipcode: string;
	price: number;
	minRunning: number;
	maxRunning: number;
	minWeight?: number;
	maxWeight?: number;
}

// Some fields are optional when calling ShipmentPriceModel.create() or ShipmentPriceModel.build()
interface ShipmentPriceCreationAttributes extends Optional<ShipmentPriceAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface ShipmentPriceInstance extends Model
<ShipmentPriceAttributes, ShipmentPriceCreationAttributes>,
	ShipmentPriceAttributes {}

type ShipmentPriceStatic = ModelCtor<ShipmentPriceInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const ShipmentPrice: ShipmentPriceStatic = sequelize.define<ShipmentPriceInstance>('shipmentPrice', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		countryId: {
			allowNull: false,
			type: dataTypes.INTEGER,
		},
		carrier: {
			type: dataTypes.ENUM('GLS', 'PDK', 'DHL', 'DSV', 'SKANLOG'),
			allowNull: false,
		},
		carrierProduct: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		maxZipcode: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		minZipcode: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		minRunning: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		maxRunning: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		minWeight: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		maxWeight: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
	}, {
		tableName: 'shipment_price',
		underscored: true,
	});
	ShipmentPrice.associate = (models) => {
		ShipmentPrice.belongsTo(models.country);
	};

	return ShipmentPrice;
};
