import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {

	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.addColumn('shipment', 'carrier_country_config_id', {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'carrier_country_config_id',
			}, { transaction: t });
		});

		await queryInterface.addConstraint('shipment', {
			type: 'foreign key', fields: ['carrier_country_config_id'], name: 'carrier_country_config_id_fk', references: { table: 'carrier-country-config', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE',
		});
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.removeConstraint('shipment', 'carrier_country_config_id_fk');

		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.removeColumn('shipment', 'carrier_country_config_id', { transaction: t });
		});
	},

};
