import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface WarrantyActivitiesAttributes {
	id: number;
	warrantyId: number;
	warrantyActivityTypeId: number;
	comment?: string;
	dateCreated?: Date;
	userId: number;
	dataLog?: string;
}

// Some fields are optional when calling WarrantyActivitiesModel.create() or WarrantyActivitiesModel.build()
interface WarrantyActivitiesCreationAttributes extends Optional<WarrantyActivitiesAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface WarrantyActivityInstance extends Model
<WarrantyActivitiesAttributes, WarrantyActivitiesCreationAttributes>,
	WarrantyActivitiesAttributes {}

type WarrantyActivitiesStatic = ModelCtor<WarrantyActivityInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const WarrantyActivities: WarrantyActivitiesStatic = sequelize.define<WarrantyActivityInstance>('warrantyActivities', {
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
		warrantyActivityTypeId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		comment: {
			type: dataTypes.TEXT,
			allowNull: true,
		},
		dateCreated: {
			type: dataTypes.DATE,
			allowNull: true,
		},
		userId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		dataLog: {
			type: dataTypes.STRING,
			allowNull: true,
		},

	}, {
		tableName: 'warranty_activities',
		underscored: true,
	});

	WarrantyActivities.associate = (models) => {
		WarrantyActivities.belongsTo(models.warranty);
		WarrantyActivities.belongsTo(models.warrantyActivityType);
		WarrantyActivities.belongsTo(models.user);
	};
	return WarrantyActivities;
};
