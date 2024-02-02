import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface PaymentCountryAttributes {
	id: number;
}

// Some fields are optional when calling PaymentCountryModel.create() or PaymentCountryModel.build()
interface PaymentCountryCreationAttributes extends Optional<PaymentCountryAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface PaymentCountryInstance extends Model
<PaymentCountryAttributes, PaymentCountryCreationAttributes>,
	PaymentCountryAttributes {}

type PaymentCountryStatic = ModelCtor<PaymentCountryInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const PaymentCountry: PaymentCountryStatic = sequelize.define<PaymentCountryInstance>('paymentCountry', {
		id: {
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
	}, {
		tableName: 'payment_country',
		underscored: true,
	});
	return PaymentCountry;
};
