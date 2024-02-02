import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface WarrantyProductsAttributes {
	id: number;
	warrantyId: number;
	brandId: number;
	supplierId: number;
	warrantyProductErrorId: number;
	amount?: number;
	itemNumber: string;
	title: string;
	productPricePayed: number;
	discount: number;
	errorDescription?: string;
	compensationNeeded?: number;
	warrantyCompensationStatusId?: number;
	file?: string;
	serialNumber?: string;
	status?: number;
	dateCreated?: Date;
	errorResponsible?: string;
	currency?: string;
	calculatedBuyingPrice?: number;
}

// Some fields are optional when calling WarrantyProductsModel.create() or WarrantyProductsModel.build()
interface WarrantyProductsCreationAttributes extends Optional<WarrantyProductsAttributes, 'id'> {
}

// We need to declare an interface for our model that is basically what our class would be
interface WarrantyProductsInstance extends Model<WarrantyProductsAttributes, WarrantyProductsCreationAttributes>,
	WarrantyProductsAttributes {
}

type WarrantyProductsStatic = ModelCtor<WarrantyProductsInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const WarrantyProducts: WarrantyProductsStatic = sequelize.define<WarrantyProductsInstance>('warrantyProducts', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		warrantyId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		brandId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		supplierId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		warrantyProductErrorId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		amount: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		itemNumber: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		title: {
			type: dataTypes.STRING,
			allowNull: false,
		},
		productPricePayed: {
			type: dataTypes.BIGINT,
			allowNull: false,
		},
		discount: {
			type: dataTypes.BIGINT,
			allowNull: true,
		},
		currency: {
			type: dataTypes.ENUM('DKK', 'NOK', 'SEK', 'EUR', 'GBP'),
			allowNull: false,
		},
		calculatedBuyingPrice: {
			type: dataTypes.BIGINT,
			allowNull: true,
			get() {
				const temp = this.getDataValue('calculatedBuyingPrice');
				return temp === null ? null : temp / 100;
			},
			set(valueToBeSet: number) {
				this.setDataValue('calculatedBuyingPrice', valueToBeSet === null ? null : Math.trunc(valueToBeSet * 100));
			}
		},
		errorDescription: {
			type: dataTypes.TEXT,
			allowNull: true,
		},
		compensationNeeded: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		warrantyCompensationStatusId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		file: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		serialNumber: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		status: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		errorResponsible: {
			type: dataTypes.ENUM('Customer', 'Wineandbarrels', 'Supplier', 'Transporter'),
			allowNull: true,
		},
		dateCreated: {
			type: dataTypes.DATE,
			allowNull: true,
		},
	}, {
		tableName: 'warranty_products',
		underscored: true,
	});

	WarrantyProducts.associate = (models) => {
		WarrantyProducts.belongsTo(models.warranty);
		WarrantyProducts.belongsTo(models.supplier);
		WarrantyProducts.belongsTo(models.warrantyCompensationStatus);
		WarrantyProducts.belongsTo(models.warrantyProductError);
		WarrantyProducts.hasMany(models.warrantySolution);
		WarrantyProducts.hasMany(models.warrantyPicturesUpload);
		WarrantyProducts.hasOne(models.product, { sourceKey: 'itemNumber', foreignKey: 'itemNumber' });
	};
	return WarrantyProducts;
};
