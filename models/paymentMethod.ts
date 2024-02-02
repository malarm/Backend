import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface PaymentMethodAttributes {
	id: number;
	paymentMethodTitle: string;
	paymentMethodType?: string;
	logo?: string;
}

// Some fields are optional when calling PaymentMethodModel.create() or PaymentMethodModel.build()
interface PaymentMethodCreationAttributes extends Optional<PaymentMethodAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface PaymentMethodInstance extends Model<PaymentMethodAttributes, PaymentMethodCreationAttributes>,
	PaymentMethodAttributes { }

type PaymentMethodStatic = ModelCtor<PaymentMethodInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const PaymentMethod: PaymentMethodStatic = sequelize.define<PaymentMethodInstance>('paymentMethod', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		paymentMethodTitle: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		paymentMethodType: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		logo: {
			type: dataTypes.STRING,
			allowNull: true,
		},
	}, {
		tableName: 'payment_method',
		underscored: true,
	});

	PaymentMethod.associate = (models) => {
		PaymentMethod.hasMany(models.order);
	};

	return PaymentMethod;
};
