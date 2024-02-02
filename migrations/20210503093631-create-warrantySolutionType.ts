import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('warranty_solution_types', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		defaultStatus: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'default_status',
		},
		canBeAdded: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'can_be_added',
		},
		final: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		allowAfterFinal: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'allow_after_final',
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('warranty_solution_types'),
};
