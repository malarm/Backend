import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('job_status', [
			{
				title: 'SYNC_UPDATED_ORDERS',
				description: 'Job to sync recent updated orders',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'SYNC_UPDATED_PRODUCTS',
				description: 'Job to sync recent updated products',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'SYNC_PRODUCTS',
				description: 'Job to sync new products',
				last_run_parameter: 0,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('job_status', null, {});
	}
};
