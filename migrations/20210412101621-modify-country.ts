import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export = {

	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.addColumn('country', 'currency_id', {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'currency_id',
			}, { transaction: t });
		});

		await queryInterface.addConstraint('country', {
			type: 'foreign key', fields: ['currency_id'], name: 'currency_id_fk', references: { table: 'currency', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE',
		});
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.removeConstraint('country', 'currency_id_fk');

		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.removeColumn('country', 'currency_id', { transaction: t });
		});
	},

};
