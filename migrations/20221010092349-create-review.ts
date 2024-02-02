import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('review', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		orderId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'order_id',
		},
		agentComment: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'agent_comment',
		},
		agentId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'agent_id',
		},
		platform: {
			allowNull: true,
			type: DataTypes.STRING,
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('review'),
};
