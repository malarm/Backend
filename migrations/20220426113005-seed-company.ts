import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('company', [
			{
				name: 'wineandbarrels',
				address: 'Rønnevangsalle 8',
				vat: '22',
				phone_no: '71 99 33 44',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Pevino',
				address: 'Rønnevangsalle 8',
				vat: '21',
				phone_no: '71 99 33 45',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('company', null, {});
	}
};
