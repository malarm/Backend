import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';
import { format } from 'date-fns';

export interface OrderAttributes {
	id: number;
	webshopId: number,
	currency: string;
	customerComment?: string;
	deliveryName?: string;
	deliveryAttention?: string;
	deliveryAddress?: string;
	deliveryZipCode?: string;
	deliveryCountry?: string;
	deliveryCost?: number;
	invoiceNumber?: number;
	iso?: string;
	orderComment?: string;
	vat: number,
	orderDate?: Date;
	orderUpdatedDate: Date;
	orderFulfilledDate?: Date;
	dueDate?: Date;
	dropPointId?: string;
	dropPointIdLong?: string;
	serviceType?: string;
	customerId: number;
	companyId: number;
	paymentMethodId: number;
	deliveryMethodId: number;
	siteId: string;
	orderStatusId: number;
	deliveryInstruction?: string;
	externalComment?: string;
	deliveryMobile?: string;
	deliveryCity?: string;
	deliveryEmail?: string;
	deliveryAddress2?: string;
}

// Some fields are optional when calling OrderModel.create() or OrderModel.build()
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface OrderInstance extends Model<OrderAttributes, OrderCreationAttributes>,
	OrderAttributes {

}

type OrderStatic = ModelCtor<OrderInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const Order: OrderStatic = sequelize.define<OrderInstance>('order', {
		id: {
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			type: dataTypes.INTEGER,
		},
		webshopId: {
			type: dataTypes.INTEGER,
			allowNull: false,
			unique: true
		},
		customerId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		currency: {
			type: dataTypes.ENUM('DKK', 'NOK', 'SEK', 'EUR', 'GBP'),
			allowNull: false,
		},
		customerComment: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		deliveryName: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		deliveryAttention: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		deliveryAddress: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		deliveryAddress2: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		deliveryZipCode: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		deliveryCountry: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		deliveryMobile: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		deliveryCity: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		deliveryEmail: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		deliveryCost: {
			type: dataTypes.BIGINT,
			allowNull: true,
		},
		invoiceNumber: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		iso: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		siteId: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		orderComment: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		vat: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		orderDate: {
			allowNull: true,
			type: dataTypes.DATE,
			get() {
				return format(this.getDataValue('orderDate'), 'yyyy-MM-dd');
			}
		},
		orderUpdatedDate: {
			allowNull: false,
			type: dataTypes.DATE,
			get() {
				return format(this.getDataValue('orderUpdatedDate'), 'yyyy-MM-dd');
			}
		},
		orderFulfilledDate: {
			allowNull: true,
			type: dataTypes.DATE,
		},
		dueDate: {
			allowNull: true,
			type: dataTypes.DATE,
		},
		dropPointId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		dropPointIdLong: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		serviceType: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		companyId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		paymentMethodId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		deliveryMethodId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		orderStatusId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		deliveryInstruction: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		externalComment: {
			type: dataTypes.STRING,
			allowNull: true,
		},
	}, {
		tableName: 'order',
		underscored: true,
	});

	Order.associate = (models) => {
		Order.hasMany(models.orderLine);
		Order.belongsTo(models.customer);
		Order.belongsTo(models.deliveryMethod);
		Order.belongsTo(models.company);
		Order.belongsTo(models.orderStatus);
		Order.belongsTo(models.paymentMethod);
	};

	return Order;
};
