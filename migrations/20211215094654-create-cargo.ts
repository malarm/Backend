import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('cargo', {
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
		amount: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		width: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		height: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		depth: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		weight: {
			type: DataTypes.INTEGER,
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('cargo'),
};
