import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface WarrantyProductErrorAttributes {
	id: number;
	title: string;
}

// Some fields are optional when calling WarrantyProductErrorModel.create() or WarrantyProductErrorModel.build()
interface WarrantyProductErrorCreationAttributes extends Optional<WarrantyProductErrorAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface WarrantyProductErrorInstance extends Model
<WarrantyProductErrorAttributes, WarrantyProductErrorCreationAttributes>,
	WarrantyProductErrorAttributes {}

type WarrantyProductErrorStatic = ModelCtor<WarrantyProductErrorInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const WarrantyProductError: WarrantyProductErrorStatic = sequelize.define<WarrantyProductErrorInstance>('warrantyProductError', {
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
	}, {
		tableName: 'warranty_product_errors',
		underscored: true,
	});

	WarrantyProductError.associate = (models) => {
		WarrantyProductError.hasMany(models.warrantyProducts);
	};

	return WarrantyProductError;
};
