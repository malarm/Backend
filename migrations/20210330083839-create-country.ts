import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('country', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		iso: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		countryCode: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'country_code',
		},
		telephoneCode: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'telephone_code',
		},
		vat: {
			type: DataTypes.INTEGER,
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('country'),
};
