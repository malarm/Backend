import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface OrderLineAttributes {
	id: number;
	itemNumber: string;
	title?: string;
	amount: number;
	price: number;
	discount?: number;
	orderId: number;
	isPacketLine: boolean;
	packetLineParentItemNumber: string;
}

// Some fields are optional when calling OrderLineModel.create() or OrderLineModel.build()
interface OrderLineCreationAttributes extends Optional<OrderLineAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface OrderLineInstance extends Model<OrderLineAttributes, OrderLineCreationAttributes>,
	OrderLineAttributes {
}

export type OrderLineStatic = ModelCtor<OrderLineInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const OrderLine: OrderLineStatic = sequelize.define<OrderLineInstance, OrderLineAttributes>('orderLine', {
		id: {
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			type: dataTypes.INTEGER,
		},
		itemNumber: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		orderId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		amount: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		price: {
			type: dataTypes.BIGINT,
			allowNull: false,
		},
		discount: {
			type: dataTypes.BIGINT,
			allowNull: true,
		},
		isPacketLine: {
			type: dataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		packetLineParentItemNumber: {
			type: dataTypes.STRING,
			allowNull: true,
		},
	}, {
		tableName: 'order_line',
		underscored: true,
	});

	OrderLine.associate = (models) => {
		OrderLine.belongsTo(models.order);
		OrderLine.hasOne(models.product, { sourceKey: 'itemNumber', foreignKey: 'itemNumber' });
	};

	return OrderLine;
};
