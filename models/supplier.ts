import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface SupplierAttributes {
	id: number;
	title: string;
	compensationStatus?: number;
	compensationNeeded?: number;
}

// Some fields are optional when calling SupplierModel.create() or SupplierModel.build()
interface SupplierCreationAttributes extends Optional<SupplierAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface SupplierInstance extends Model
<SupplierAttributes, SupplierCreationAttributes>,
	SupplierAttributes {}

type SupplierStatic = ModelCtor<SupplierInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const Supplier: SupplierStatic = sequelize.define<SupplierInstance>('supplier', {
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
		compensationStatus: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		compensationNeeded: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	}, {
		tableName: 'supplier',
		underscored: true,
	});

	Supplier.associate = (models) => {
		Supplier.hasMany(models.product);
	};

	return Supplier;
};
