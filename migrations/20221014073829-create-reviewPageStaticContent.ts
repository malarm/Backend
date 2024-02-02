import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('review_page_static_content', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		languageId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'language',
				key: 'id'
			},
			field: 'language_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		headline: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		subHeadline: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'sub_headline',
		},
		submit: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		submit2: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		continue: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		thankYouHeader: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'thank_you_header',
		},
		thankYouSubHeaderBadReview: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'thank_you_sub_header_bad_review',
		},
		thankYouSubHeaderGoodReview: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'thank_you_sub_header_good_review',
		},
		thankYouSubHeaderGoodReviewShare: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'thank_you_sub_header_good_review_share',
		},
		explainShare: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'explain_share',
		},
		priceRunner: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'price_runner',
		},
		trustpilot: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		google: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		fackbook: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		googleUrl: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'google_url',
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
			field: 'created_at',
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
			field: 'updated_at',
		},
	}),
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('review_page_static_content'),
};
