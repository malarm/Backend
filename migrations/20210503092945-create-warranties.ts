import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('warranties', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		warrantyTagTypeId: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'warranty_tag_type_id',
		},
		oderId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'order',
				key: 'id'
			},
			field: 'order_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'last_name',
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		zipCode: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'zip_code',
		},
		city: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		countryCode: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'country_code',
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		alternativePhone: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'alternative_phone',
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		alternativeEmail: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'alternative_email',
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		orderDate: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'order_date',
		},
		orderFulfilledDate: {
			allowNull: true,
			type: DataTypes.DATE,
			field: 'order_fulfilled_date',
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
		agentId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'user',
				key: 'id'
			},
			field: 'agent_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		dueDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'due_date',
		},
		archive: {
			type: DataTypes.BOOLEAN,
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('warranties'),
};
