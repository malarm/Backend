import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface ReviewAttributes {
	id: number;
	orderId?: number,
	agentComment?: string;
	agentId?: number;
	platform?: string;
	dateCreated?: Date;
	updatedAt: Date;
}

// Some fields are optional when calling ReviewModel.create() or ReviewModel.build()
interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ReviewInstance extends Model<ReviewAttributes, ReviewCreationAttributes>,
	ReviewAttributes { }

type ReviewStatic = ModelCtor<ReviewInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const Review: ReviewStatic = sequelize.define<ReviewInstance>('review', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		orderId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		agentComment: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		agentId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		platform: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		dateCreated: {
			type: dataTypes.DATE,
			allowNull: true,
		},
		updatedAt: {
			type: dataTypes.DATE,
			allowNull: false,
		},
	}, {
		tableName: 'review',
		underscored: true,
	});


	Review.associate = (models) => {
		Review.hasMany(models.reviewDetail);
		Review.hasOne(models.warranty, { foreignKey: 'orderId', sourceKey: 'orderId' });
	};

	return Review;
};
