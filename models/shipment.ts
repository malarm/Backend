import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface ShipmentAttributes {
	id: number;
	orderId: number;
	userId: number;
	carrierCountryConfigId?: number;
	returnStatus?: boolean;
	bookedDatetime: Date;
	originCompanyName?: string;
	originName?: string;
	originAddress?: string;
	originExtraInfo?: string;
	originZipCode?: string;
	originCity?: string;
	originCountry?: string;
	originEmail?: string;
	originPhonePrefix?: string;
	originPhoneNumber?: string;
	originTimeWindowStart?: string;
	originTimeWindowEnd?: string;
	shipmentDate?: Date;
	companyName?: string;
	customerName?: string;
	customerAddress?: string;
	customerExtraAddress?: string;
	customerZipcode?: string;
	customerCity?: string;
	customerCountry?: string;
	customerEmail?: string;
	customerPhone?: string;
	timeWindowStart?: Date;
	timeWindowEnd?: Date;
	deliveryInstruction?: string;
	flexLiability?: boolean;
	platformId?: string;
	trackTrace?: string;
	trackTraceSend?: Date;
	services?: string;
	carrierServices?: string;
	phoneNotification?: boolean;
	error?: string;
	externalCarrierId?: string;
}

// Some fields are optional when calling ShipmentModel.create() or ShipmentModel.build()
interface ShipmentCreationAttributes extends Optional<ShipmentAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ShipmentInstance extends Model<ShipmentAttributes, ShipmentCreationAttributes>,
	ShipmentAttributes { }

type ShipmentStatic = ModelCtor<ShipmentInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const Shipment: ShipmentStatic = sequelize.define<ShipmentInstance>('shipment', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		orderId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		userId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		carrierCountryConfigId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		returnStatus: {
			type: dataTypes.BOOLEAN,
			allowNull: true,
		},
		bookedDatetime: {
			type: dataTypes.DATE,
			allowNull: false,
		},
		originCompanyName: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		originName: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		originAddress: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		originExtraInfo: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		originZipCode: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		originCity: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		originCountry: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		originEmail: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		originPhonePrefix: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		originPhoneNumber: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		originTimeWindowStart: {
			type: dataTypes.DATE,
			allowNull: true,
		},
		originTimeWindowEnd: {
			type: dataTypes.DATE,
			allowNull: true,
		},
		shipmentDate: {
			type: dataTypes.DATE,
			allowNull: true,
		},
		companyName: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		customerName: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		customerAddress: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		customerExtraAddress: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		customerZipcode: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		customerCity: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		customerCountry: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		customerEmail: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		customerPhone: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		timeWindowStart: {
			type: dataTypes.DATE,
			allowNull: true,
		},
		timeWindowEnd: {
			type: dataTypes.DATE,
			allowNull: true,
		},
		deliveryInstruction: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		flexLiability: {
			type: dataTypes.BOOLEAN,
			allowNull: true,
		},
		services: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		carrierServices: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		phoneNotification: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'phone_notification',
		},
		error: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		platformId: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		externalCarrierId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		trackTrace: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		trackTraceSend: {
			type: dataTypes.DATE,
			allowNull: true,
		},

	}, {
		tableName: 'shipment',
		underscored: true,
	});

	Shipment.associate = (models) => {
		Shipment.hasOne(models.order, { foreignKey: 'webshopId', sourceKey: 'orderId' });
		Shipment.hasOne(models.carrierCountryConfig, { foreignKey: 'Id', sourceKey: 'carrierCountryConfigId' });
		Shipment.hasMany(models.cargo);
		Shipment.hasMany(models.goods);
	};

	return Shipment;
};
