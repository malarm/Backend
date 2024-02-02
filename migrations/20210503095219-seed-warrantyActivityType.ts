import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('warranty_activity_type', [
			{
				type: 'Comment',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				type: 'System',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				type: 'Email',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				type: 'SystemLog',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('warranty_activity_type', null, {});
	}
};
