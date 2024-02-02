import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('questions_localisation', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		questionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'questions',
				key: 'id'
			},
			field: 'question_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
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
		question: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		questionSubContent: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'question_sub_content',
		},
		questionCommentLabel: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'question_comment_label',
		},
		questionCommentPlaceholder: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'question_comment_placeholder',
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('questions_localisation'),
};
