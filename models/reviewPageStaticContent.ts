import {
	DataTypes, Model, ModelCtor, Optional, Sequelize
} from 'sequelize';

export interface ReviewPageStaticContentAttributes {
	id: number;
	languageId?: number,
	headline?: string;
	subHeadline?: string;
	submit?: string;
	submit2?: string;
	continue?: string;
	thankYouHeader?: string;
	thankYouSubHeaderBadReview?: string;
	thankYouSubHeaderGoodReview?: string;
	thankYouSubHeaderGoodReviewShare?: string;
	explainShare?: string;
	priceRunner?: string;
	trustpilot?: string;
	google?: string;
	fackbook?: string;
	googleUrl?: string;
}

// Some fields are optional when calling ReviewPageStaticContentModel.create() or ReviewPageStaticContentModel.build()
interface ReviewPageStaticContentCreationAttributes extends Optional<ReviewPageStaticContentAttributes, 'id'> { }

// We need to declare an interface for our model that is basically what our class would be
interface ReviewPageStaticContentInstance extends Model<ReviewPageStaticContentAttributes, ReviewPageStaticContentCreationAttributes>,
	ReviewPageStaticContentAttributes { }

type ReviewPageStaticContentStatic = ModelCtor<ReviewPageStaticContentInstance> & {
	associate?: (models: { [key: string]: ModelCtor<Model> }) => void
};

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
	const ReviewPageStaticContent: ReviewPageStaticContentStatic = sequelize.define<ReviewPageStaticContentInstance>('reviewPageStaticContent', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: dataTypes.INTEGER,
		},
		languageId: {
			type: dataTypes.INTEGER,
			allowNull: true,
		},
		headline: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		subHeadline: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		submit: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		submit2: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		continue: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		thankYouHeader: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		thankYouSubHeaderBadReview: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		thankYouSubHeaderGoodReview: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		thankYouSubHeaderGoodReviewShare: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		explainShare: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		priceRunner: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		trustpilot: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		google: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		fackbook: {
			type: dataTypes.STRING,
			allowNull: true,
		},
		googleUrl: {
			type: dataTypes.STRING,
			allowNull: true,
		},
	}, {
		tableName: 'review_page_static_content',
		underscored: true,
	});

	return ReviewPageStaticContent;
};
