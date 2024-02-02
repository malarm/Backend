import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface LanguageAttributes {
	id: number;
	code?: string,
	description?: string;
}

// Some fields are optional when calling LanguageModel.create() or LanguageModel.build()
interface LanguageCreationAttributes extends Optional<LanguageAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface LanguageInstance extends Model<LanguageAttributes, LanguageCreationAttributes>,
	LanguageAttributes { }

type LanguageStatic = ModelCtor<LanguageInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const Language: LanguageStatic = sequelize.define<LanguageInstance>('language', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		code: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		description: {
			type: dataTypes.STRING,
			allowNull: true,
		},

	}, {
		tableName: 'language',
		underscored: true,
	});

	return Language;
};
