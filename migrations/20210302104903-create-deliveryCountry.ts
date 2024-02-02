import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('delivery_country', {
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
		deliveryMethodId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'delivery_method',
				key: 'id'
			},
			field: 'delivery_method_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('delivery_country'),
};
