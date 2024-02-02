import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('product_price', {
		id: {
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
		productId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'product',
				key: 'id'
			},
			field: 'product_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		price: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		discount: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		discountType: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'discount_type',
		},
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		currency: {
			type: DataTypes.ENUM('DKK', 'NOK', 'SEK', 'EUR', 'GBP'),
			allowNull: false,
		},
		iso: {
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('product_price'),
};
