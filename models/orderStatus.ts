import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface OrderStatusAttributes {
	id: number;
	title: string;
	type: string;
}

// Some fields are optional when calling OrderStatusModel.create() or OrderStatusModel.build()
interface OrderStatusCreationAttributes extends Optional<OrderStatusAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface OrderStatusInstance extends Model<OrderStatusAttributes, OrderStatusCreationAttributes>,
	OrderStatusAttributes {}

type OrderStatusStatic = ModelCtor<OrderStatusInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const OrderStatus: OrderStatusStatic = sequelize.define<OrderStatusInstance>('orderStatus', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		title: {
			type: dataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		type: {
			type: dataTypes.ENUM('Cancel', 'Open', 'Fullfilled', 'Draft'),
			allowNull: false,
		},
	}, {
		tableName: 'order_status',
		underscored: true,
	});

	OrderStatus.associate = (models) => OrderStatus.hasMany(models.order);

	return OrderStatus;
};
