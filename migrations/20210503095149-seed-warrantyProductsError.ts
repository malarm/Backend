import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('warranty_product_errors', [
			{
				title: 'Freight damage DSV',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Freight damage GLS',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Noise',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Not cooling',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Vinkøleskab står forkert på sokkel',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Physical damages from manufacturer',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Damages from use of product',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Accessories missing (e.g. screws or manual)',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Other',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Freight damage DHL',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Freight damage Skanlog',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Package missing GLS',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Electronic error',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Fragtskade Postnord',
				created_at: new Date(),
				updated_at: new Date(),
			},

		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('warranty_product_errors', null, {});
	}
};
