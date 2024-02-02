import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface ProductAttributes {
	id: number;
	webshopId?: number,
	itemNumber?: string;
	title?: string;
	variantId?: number;
	recommendedPrice?: number;
	price?: number;
	discount?: number;
	discountType?: string;
	calculatedBuyingPrice?: number;
	status?: number;
	ean?: string;
	customsCode?: string;
	originCountry?: string;
	stock?: number;
	netWidth?: number;
	netDepth?: number;
	netHeight?: number,
	netWeight?: number;
	grossWidth?: number;
	grossDepth?: number;
	grossHeight?: number;
	grossWeight?: number;
	statusWhenSoldOut?: number;
	buyWhenSoldOut?: number;
	dateCreated?: Date;
	dateUpdated?: Date;
	// userGroupAccessIds?: string;

}

// Some fields are optional when calling ProductModel.create() or ProductModel.build()
interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ProductInstance extends Model<ProductAttributes, ProductCreationAttributes>,
	ProductAttributes { }

type ProductStatic = ModelCtor<ProductInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const Product: ProductStatic = sequelize.define<ProductInstance>('product', {
		id: {
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
		webshopId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: 'productVariantUniqueIndex',
		},
		itemNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		variantId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			unique: 'productVariantUniqueIndex',
		},
		recommendedPrice: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		price: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		discount: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		discountType: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		calculatedBuyingPrice: {
			type: DataTypes.BIGINT,
			allowNull: true,
			get() {
				const temp = this.getDataValue('calculatedBuyingPrice');
				return temp === null ? null : temp / 100;
			}
			/* set(valueToBeSet: number) {
					this.setDataValue('calculatedBuyingPrice', valueToBeSet * 100);
				} */
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		ean: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		customsCode: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		originCountry: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		netWidth: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		netDepth: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		netHeight: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		netWeight: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		grossWidth: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		grossDepth: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		grossHeight: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		grossWeight: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		statusWhenSoldOut: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		buyWhenSoldOut: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		/* userGroupAccessIds: {
			type: DataTypes.STRING,
			allowNull: true,
		}, */
		dateCreated: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		dateUpdated: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	}, {
		tableName: 'product',
		underscored: true,
	});

	Product.associate = (models) => {
		Product.hasMany(models.productPrice);
		Product.belongsTo(models.brand);
		Product.belongsTo(models.supplier);
	};
	return Product;
};
