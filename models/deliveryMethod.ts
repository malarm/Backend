import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface DeliveryMethodAttributes {
	id: number;
	title: string;
	deliveryPrice?: number;
	logo?: string;
}

// Some fields are optional when calling DeliveryMethodModel.create() or DeliveryMethodModel.build()
interface DeliveryMethodCreationAttributes extends Optional<DeliveryMethodAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface DeliveryMethodInstance extends Model<DeliveryMethodAttributes, DeliveryMethodCreationAttributes>,
	DeliveryMethodAttributes { }

type DeliveryMethodStatic = ModelCtor<DeliveryMethodInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const DeliveryMethod: DeliveryMethodStatic = sequelize.define<DeliveryMethodInstance>('deliveryMethod', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		title: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		deliveryPrice: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		logo: {
			type: dataTypes.STRING,
			allowNull: true,
		},
	}, {
		tableName: 'delivery_method',
		underscored: true,
	});

	return DeliveryMethod;
};
