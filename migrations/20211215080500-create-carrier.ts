import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('carrier', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		carrier: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		carrierCode: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'carrier_code',
		},
		platform: {
			type: DataTypes.ENUM('Shipmondo', 'Dropboy'),
			allowNull: false,
		},
		logo: {
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('carrier'),
};
