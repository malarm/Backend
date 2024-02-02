import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('skanlog_se_hub', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		minZip: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'min_zip',
		},
		maxZip: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'max_zip',
		},
		zone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hub: {
			type: DataTypes.STRING,
			allowNull: false,
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('skanlog_se_hub'),
};
