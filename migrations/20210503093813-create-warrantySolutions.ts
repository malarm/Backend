import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {
	up: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.createTable('warranty_solutions', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		warrantySolutionTypeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'warranty_solution_types',
				key: 'id'
			},
			field: 'warranty_solution_type_id',
			onDelete: 'CASCADE',
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
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
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
		endedBy: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'user',
				key: 'id'
			},
			field: 'ended_by',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		createdBy: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'user',
				key: 'id'
			},
			field: 'user_id',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		techId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'tech_id',
		},
		ticketId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'ticket_id',
		},
		costTech: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'cost_tech',
		},
		costSpareparts: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'cost_spareparts',
		},
		costReplace: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'cost_replace',
		},
		costShipping: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'cost_shipping',
		},
		costReturnShipping: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'cost_return_shipping',
		},
		compensated: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		replaceOrderId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'replace_order_id',
		},
		returnOrderId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'return_order_id',
		},
		dateCreated: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'date_created',
		},
		dateEnded: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'date_ended',
		},
		dateAction: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'date_action',
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
	down: (queryInterface: QueryInterface, sequelize: Sequelize) => queryInterface.dropTable('warranty_solutions'),
};
