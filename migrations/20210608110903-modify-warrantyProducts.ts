import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {

	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.addColumn('warranty_products', 'warranty_compensation_status_id', {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'warranty_compensation_status_id',
			}, { transaction: t });
		});

		await queryInterface.addConstraint('warranty_products', {
			type: 'foreign key', fields: ['warranty_compensation_status_id'], name: 'warranty_compensation_status_id_fk', references: { table: 'warranty_compensation_status', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE',
		});
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.removeConstraint('warranty_products', 'warranty_compensation_status_id_fk');

		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.removeColumn('warranty_products', 'warranty_compensation_status_id', { transaction: t });
		});
	},

};
