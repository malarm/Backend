import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('review_detail', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		reviewId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'review',
				key: 'id'
			},
			field: 'review_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		questionsId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'questions',
				key: 'id'
			},
			field: 'questions_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		questionsLocalisationId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'questions_localisation',
				key: 'id'
			},
			field: 'questions_localisation_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		comment: {
			type: DataTypes.STRING,
			allowNull: true,
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('review_detail'),
};
