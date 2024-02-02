import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface ReviewDetailAttributes {
	id: number;
	reviewId?: number,
	questionsId?: number,
	questionsLocalisationId?: number,
	rating?: number;
	comment?: string;
}

// Some fields are optional when calling ReviewDetailModel.create() or ReviewDetailModel.build()
interface ReviewDetailCreationAttributes extends Optional<ReviewDetailAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ReviewDetailInstance extends Model<ReviewDetailAttributes, ReviewDetailCreationAttributes>,
	ReviewDetailAttributes { }

type ReviewDetailStatic = ModelCtor<ReviewDetailInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const ReviewDetail: ReviewDetailStatic = sequelize.define<ReviewDetailInstance>('reviewDetail', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		reviewId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		questionsId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		questionsLocalisationId: {
			type: dataTypes.INTEGER,
			allowNull: false,
		},
		rating: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		comment: {
			type: dataTypes.STRING,
			allowNull: true,
		},
	}, {
		tableName: 'review_detail',
		underscored: true,
	});

	ReviewDetail.associate = (models) => {
		ReviewDetail.hasOne(models.questions, { foreignKey: 'id', sourceKey: 'questions_id' });
		ReviewDetail.hasOne(models.questionsLocalisation, { foreignKey: 'id', sourceKey: 'questions_localisation_id' });
	};

	return ReviewDetail;
};
