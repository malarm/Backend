import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface QuestionsAttributes {
	id: number;
	name?: string,
	orderOfQuestion?: number;
	isInDepth?: boolean;
	deleted?: boolean;
	dateCreated?: Date;
}

// Some fields are optional when calling QuestionsModel.create() or QuestionsModel.build()
interface QuestionsCreationAttributes extends Optional<QuestionsAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface QuestionsInstance extends Model<QuestionsAttributes, QuestionsCreationAttributes>,
	QuestionsAttributes { }

type QuestionsStatic = ModelCtor<QuestionsInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const Questions: QuestionsStatic = sequelize.define<QuestionsInstance>('questions', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		name: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		orderOfQuestion: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		isInDepth: {
			type: dataTypes.BOOLEAN,
			allowNull: true,
		},
		deleted: {
			type: dataTypes.BOOLEAN,
			allowNull: true,
		},
		dateCreated: {
			type: dataTypes.DATE,
			allowNull: true,
		},
	}, {
		tableName: 'questions',
		underscored: true,
	});

	Questions.associate = (models) => {
		Questions.hasOne(models.reviewDetail, { foreignKey: 'questions_id', sourceKey: 'id' });
		Questions.hasMany(models.questionsLocalisation);
	};

	return Questions;
};
