import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

interface WarrantySolutionTypeAttributes {
	id: number;
	title: string;
	defaultStatus: number;
	canBeAdded: number;
	final: number;
	allowAfterFinal: number;
}

// Some fields are optional when calling WarrantySolutionTypeModel.create() or WarrantySolutionTypeModel.build()
interface WarrantySolutionTypeCreationAttributes extends Optional<WarrantySolutionTypeAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface WarrantySolutionTypeInstance extends Model
<WarrantySolutionTypeAttributes, WarrantySolutionTypeCreationAttributes>,
	WarrantySolutionTypeAttributes {}

type WarrantySolutionTypeStatic = ModelCtor<WarrantySolutionTypeInstance> & {
	associate?: (models: {[key: string]: ModelCtor<Model>}) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const WarrantySolutionType: WarrantySolutionTypeStatic = sequelize.define<WarrantySolutionTypeInstance>('warrantySolutionType', {
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
		defaultStatus: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		canBeAdded: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		final: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		allowAfterFinal: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
	}, {
		tableName: 'warranty_solution_types',
		underscored: true,
	});

	WarrantySolutionType.associate = (models) => {
		WarrantySolutionType.hasMany(models.warrantySolution);
		// WarrantySolutionType.hasMany(models.warrantyProducts);
	};
	return WarrantySolutionType;
};
