import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('warranty_activities', {
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
		warrantyActivityTypeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'warranty_activity_type',
				key: 'id'
			},
			field: 'warranty_activity_type_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		dateCreated: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'date_created',
		},
		createdBy: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id'
			},
			field: 'user_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		dataLog: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'data_log',
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('warranty_activities'),
};
