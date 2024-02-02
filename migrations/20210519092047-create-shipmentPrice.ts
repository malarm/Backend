import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('shipment_price', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		countryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'country',
				key: 'id'
			},
			field: 'country_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		carrier: {
			type: DataTypes.ENUM('GLS', 'PDK', 'DHL', 'DSV', 'SKANLOG'),
			allowNull: false,
		},
		carrierProduct: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'carrier_product',
		},
		maxZipcode: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'max_zipcode',
		},
		minZipcode: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'min_zipcode',
		},
		price: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		minRunning: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'min_running',
		},
		maxRunning: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'max_running',
		},
		minWeight: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'min_weight',
		},
		maxWeight: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'max_weight',
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('shipment_price'),
};
