import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('technician', [
			{
				name: 'Manuel (blot registrering)',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'DIN HVIDEVARESERVICE APS',
				address: 'Mågevej 26, 2650 Hvidovre',
				email: 'tekniker@hvidevareservice.nu',
				phone: '+4543626633',
				country_code: 'DK',
				service_zip: '1000-1473,1501-1799,1800-1974,2000-2690,2700-3670,4000-4140,4174,4300-4390,4420,4500-4583,4592,4600-4632,4652-4653,4660-4682',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'LF SERVICECENTER',
				address: 'Gartnervej 2A, 4800 Nykøbing Falster',
				email: 'service@lf-servicecenter.dk',
				phone: '54857066',
				country_code: 'DK',
				service_zip: '4160-4173,4180-4296,4400,4440-4490,4591,4593,4640,4654,4683-4990',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'K. NYBORG HANSEN APS',
				address: 'Grønnegade 2, 3700 Nexø',
				email: 'mail@knh-el.dk',
				phone: '56492095',
				country_code: 'DK',
				service_zip: '3700-3790',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'SERVICE CENTRALEN SYD APS',
				address: 'Stærmosevej 26, Brændekilde 5250 Odense SV',
				email: 'service@scsyd.dk',
				phone: '75569999',
				country_code: 'DK',
				service_zip: '5000-5985,6000-6070,6091-6094,6560-6622,6640,7000-7184,7300-7321,8721-8723,8762-8763,8781-8783',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'HVIDEVARECENTERVEST',
				address: 'Grønnevej 20, 6851 Janderup',
				email: 'hvidevarecentervest@gmail.com',
				phone: '75269190',
				country_code: 'DK',
				service_zip: '6100-6240,6261-6280,6300-6392,6400-6470,6500-6541,6623-6630,6650-6690,6700-6792,6800-6893,7190-7250',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'CJ HVIDEVARESERVICE APS',
				address: 'Hvedevej 5, DK-8920 Randers NV',
				email: 'cjservice@cjservice.dk',
				phone: '86477777',
				country_code: 'DK',
				service_zip: '6900-6990,7260-7280,7323-7680,7800-7884,8000-8700,8732-8752,8765-8766,8800-8990,9550',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Malar',
				address: 'test',
				email: 'mru@wineandbarrels.com',
				phone: '1111',
				country_code: 'DK',
				service_zip: 'test',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('technician', null, {});
	}
};
