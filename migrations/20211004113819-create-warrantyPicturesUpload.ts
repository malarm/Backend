import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('warranty_pictures_upload', {
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
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		},
		warrantyProductsId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'warranty_products',
				key: 'id'
			},
			field: 'warranty_product_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		},
		file: {
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('warranty_pictures_upload'),
};
