import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {

	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.addColumn('order', 'delivery_method_id', {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'delivery_method_id',
			}, { transaction: t });
			/* await queryInterface.addColumn('order', 'shipment_id', {
					type: DataTypes.INTEGER,
					allowNull: true,
					field: 'shipment_id',
				}, { transaction: t }); */
		});

		await queryInterface.addConstraint('order', {
			type: 'foreign key', fields: ['delivery_method_id'], name: 'delivery_method_id_fk', references: { table: 'delivery_method', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE',
		});
		/* await queryInterface.addConstraint('order', {
			type: 'foreign key', fields: ['shipment_id'], name: 'shipment_id_fk', references: { table: 'shipment', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE',
		}); */
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.removeConstraint('order', 'delivery_method_id_fk');
		// await queryInterface.removeConstraint('order', 'shipment_id_fk');

		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.removeColumn('order', 'delivery_method_id', { transaction: t });
			// await queryInterface.removeColumn('order', 'shipemnt_id', { transaction: t });
		});
	},

};
