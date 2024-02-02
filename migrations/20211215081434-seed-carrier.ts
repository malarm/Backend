import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('carrier', [
			{
				carrier: 'GLS',
				carrier_code: 'GLS',
				platform: 'Shipmondo',
				logo: 'gls-icon.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				carrier: 'Postnord',
				carrier_code: 'PDK',
				platform: 'Shipmondo',
				logo: 'postnord.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				carrier: 'DSV',
				carrier_code: 'DSV',
				platform: 'Shipmondo',
				logo: 'dsv.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				carrier: 'Skanlog',
				carrier_code: 'SkanlogDK',
				platform: 'Dropboy',
				logo: 'skanlog.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				carrier: 'Skanlog',
				carrier_code: 'SkanlogSE',
				platform: 'Dropboy',
				logo: 'skanlog.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('carrier', null, {});
	}
};
