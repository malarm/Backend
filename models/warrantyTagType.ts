import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface WarrantyTagTypeAttributes {
	id: number;
	title: string;
	class?: string;
}

// Some fields are optional when calling WarrantyTagTypeModel.create() or WarrantyTagTypeModel.build()
interface WarrantyTagTypeCreationAttributes extends Optional<WarrantyTagTypeAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface WarrantyTagTypeInstance extends Model
<WarrantyTagTypeAttributes, WarrantyTagTypeCreationAttributes>,
	WarrantyTagTypeAttributes {}

type WarrantyTagTypeStatic = ModelCtor<WarrantyTagTypeInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const WarrantyTagType: WarrantyTagTypeStatic = sequelize.define<WarrantyTagTypeInstance>('warrantyTagType', {
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
		class: {
			type: dataTypes.STRING,
			allowNull: false,
		},

	}, {
		tableName: 'warranty_tag_types',
		underscored: true,
	});

	WarrantyTagType.associate = (models) => {
		WarrantyTagType.hasMany(models.warranty);
	};
	return WarrantyTagType;
};
