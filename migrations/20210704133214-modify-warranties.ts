import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.removeConstraint('warranties', 'warranties_order_id_fkey');
		});
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.removeConstraint('warranties', 'warranties_order_id_fkey');
		});
	},
};
