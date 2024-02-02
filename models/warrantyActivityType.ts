import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface WarrantyActivityTypeAttributes {
	id: number;
	type: string;
}

// Some fields are optional when calling WarrantyTagTypeModel.create() or WarrantyTagTypeModel.build()
interface WarrantyActivityTypeCreationAttributes extends Optional<WarrantyActivityTypeAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface WarrantyActivityTypeInstance extends Model
<WarrantyActivityTypeAttributes, WarrantyActivityTypeCreationAttributes>,
	WarrantyActivityTypeAttributes {}

type WarrantyActivityTypeStatic = ModelCtor<WarrantyActivityTypeInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const WarrantyActivityType: WarrantyActivityTypeStatic = sequelize.define<WarrantyActivityTypeInstance>('warrantyActivityType', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		type: {
			type: dataTypes.STRING,
			allowNull: false,
		},

	}, {
		tableName: 'warranty_activity_type',
		underscored: true,
	});

	WarrantyActivityType.associate = (models) => {
		WarrantyActivityType.hasMany(models.warrantyActivities);
	};
	return WarrantyActivityType;
};
