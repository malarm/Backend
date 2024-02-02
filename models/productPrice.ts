import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface ProductPriceAttributes {
	id: number;
	price?: number;
	discount?: number;
	amount?: number;
	currency?: string;
	iso?: string;
	discountType?: string;
	productId: number;
}

// Some fields are optional when calling ProductPriceModel.create() or ProductPriceModel.build()
interface ProductPriceCreationAttributes extends Optional<ProductPriceAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface ProductPriceInstance extends Model<ProductPriceAttributes, ProductPriceCreationAttributes>,
	ProductPriceAttributes {
}

export type ProductPriceStatic = ModelCtor<ProductPriceInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const ProductPrice: ProductPriceStatic = sequelize.define<ProductPriceInstance, ProductPriceAttributes>('productPrice', {
		id: {
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
		price: {
			type: dataTypes.BIGINT,
			allowNull: false,
		},
		discount: {
			type: dataTypes.BIGINT,
			allowNull: false,
		},
		discountType: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'discount_type',
		},
		productId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		amount: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		currency: {
			type: dataTypes.ENUM('DKK', 'NOK', 'SEK', 'EUR', 'GBP'),
			allowNull: false,
		},
		iso: {
			type: dataTypes.STRING,
			allowNull: true,
		},
	}, {
		tableName: 'product_price',
		underscored: true,
	});

	ProductPrice.associate = (models) => {
		ProductPrice.belongsTo(models.product);
	};

	return ProductPrice;
};
