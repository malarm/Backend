import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('questions', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		orderOfQuestion: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'order_of_question',
		},
		isInDepth: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'is_in_depth',
		},
		deleted: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
		dateCreated: {
			allowNull: false,
			type: DataTypes.DATE,
			field: 'date_created',
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('questions'),
};
