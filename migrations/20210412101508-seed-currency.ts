import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('currency', [
			{
				id: 1,
				currency: 'DKK',
				price: 100,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 4,
				currency: 'NOK',
				price: 75,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				currency: 'SEK',
				price: 71,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 3,
				currency: 'EUR',
				price: 747,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 5,
				currency: 'GBP',
				price: 816,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('currency', null, {});
	}
};
