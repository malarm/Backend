import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('goods', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		shipmentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'shipment',
				key: 'id'
			},
			field: 'shipment_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		countryCode: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'country_code',
		},
		itemNumber: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'item_number',
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		customsCode: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'customs_code',
		},
		unitValue: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'unit_value',
		},
		weight: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		currency: {
			type: DataTypes.ENUM('DKK', 'NOK', 'SEK', 'EUR', 'GBP'),
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('goods'),
};
