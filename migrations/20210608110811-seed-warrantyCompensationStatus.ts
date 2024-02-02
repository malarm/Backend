import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('warranty_compensation_status', [
			{
				title: 'Not applied for',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Unnecessary',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Applied for',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Approved, but not received',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Approved, received',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Declined',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('warranty_compensation_status', null, {});
	}
};
