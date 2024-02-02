import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface QuestionsLocalisationAttributes {
	id: number;
	questionId?: number,
	languageId?: number;
	question?: string;
	subContent?: string;
	commentLabel?: string;
	commentPlaceholder?: string;
}

// Some fields are optional when calling QuestionsLocalisationModel.create() or QuestionsLocalisationModel.build()
interface QuestionsLocalisationCreationAttributes extends Optional<QuestionsLocalisationAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface QuestionsLocalisationInstance extends Model<QuestionsLocalisationAttributes, QuestionsLocalisationCreationAttributes>,
	QuestionsLocalisationAttributes { }

type QuestionsLocalisationStatic = ModelCtor<QuestionsLocalisationInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const QuestionsLocalisation: QuestionsLocalisationStatic = sequelize.define<QuestionsLocalisationInstance>('questionsLocalisation', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		questionId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		languageId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		question: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		subContent: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		commentLabel: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		commentPlaceholder: {
			type: dataTypes.STRING,
			allowNull: true,
		},
	}, {
		tableName: 'questions_localisation',
		underscored: true,
	});

	QuestionsLocalisation.associate = (models) => {
		QuestionsLocalisation.hasOne(models.reviewDetail, { foreignKey: 'questions_localisation_id', sourceKey: 'id' });
		QuestionsLocalisation.belongsTo(models.language);
	};

	return QuestionsLocalisation;
};
