import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('warranty_products', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		warrantyId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'warranties',
				key: 'id'
			},
			field: 'warranty_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		brandId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'brand',
				key: 'id'
			},
			field: 'brand_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		supplierId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'supplier',
				key: 'id'
			},
			field: 'supplier_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		warrantyProductErrorId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'warranty_product_errors',
				key: 'id'
			},
			field: 'warranty_product_error_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		},
		amount: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		itemNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'item_number',
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ProductPricePayed: {
			type: DataTypes.BIGINT,
			allowNull: false,
			field: 'product_price_payed',
		},
		discount: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		currency: {
			type: DataTypes.ENUM('DKK', 'NOK', 'SEK', 'EUR', 'GBP'),
			allowNull: false,
		},
		calculatedBuyingPrice: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'calculated_buying_price',
		},
		errorDescription: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'error_description',
		},
		compensationNeeded: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'compensation_needed',
		},
		file: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		serialNumber: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'serial_number',
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		errorResponsible: {
			type: DataTypes.ENUM('Customer', 'Wineandbarrels', 'Supplier', 'Transporter'),
			allowNull: true,
			field: 'error_responsible',
		},
		dateCreated: {
			type: DataTypes.DATE,
			allowNull: true,
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('warranty_products'),
};
