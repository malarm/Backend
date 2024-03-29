import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('skanlog_se_hub', [
			{
				min_zip: '10000',
				max_zip: '14999',
				zone: 'Stockholm (Årsta)',
				hub: 'SSD11',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '15000',
				max_zip: '15999',
				zone: 'Eskilstuna Södertälje, Nykvarn och Järna',
				hub: 'SSD1',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '16000',
				max_zip: '19999',
				zone: 'Stockholm (Årsta)',
				hub: 'SSD11',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '20000',
				max_zip: '28375',
				zone: 'Helsingborg',
				hub: '977',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '28376',
				max_zip: '28376',
				zone: 'Varberg',
				hub: 'SSD12',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '28377',
				max_zip: '29999',
				zone: 'Helsingborg',
				hub: '977',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '30000',
				max_zip: '32999',
				zone: 'Varberg',
				hub: 'SSD12',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '33000',
				max_zip: '39999',
				zone: 'Växjö',
				hub: 'SSD4',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '40000',
				max_zip: '43229',
				zone: 'Göteborg',
				hub: 'SSD2',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '43230',
				max_zip: '43299',
				zone: 'Varberg (Varberg är egen hub)',
				hub: 'SSD12',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '43300',
				max_zip: '44999',
				zone: 'Göteborg',
				hub: 'SSD2',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '45000',
				max_zip: '47499',
				zone: 'Trollhättan',
				hub: 'SSD13',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '47500',
				max_zip: '49999',
				zone: 'Göteborg',
				hub: 'SSD2',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '50000',
				max_zip: '52999',
				zone: 'Borås',
				hub: 'SSD14',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '53000',
				max_zip: '53999',
				zone: 'Trollhättan',
				hub: 'SSD13',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '54000',
				max_zip: '54999',
				zone: 'Karlstad',
				hub: 'SSD6',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '55000',
				max_zip: '56699',
				zone: 'Linköping',
				hub: 'SSD5',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '56700',
				max_zip: '57299',
				zone: 'Växjö',
				hub: 'SSD4',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '57400',
				max_zip: '57999',
				zone: 'Växjö',
				hub: 'SSD4',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '57300',
				max_zip: '57399',
				zone: 'Linköping',
				hub: 'SSD5',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '58000',
				max_zip: '61999',
				zone: 'Linköping',
				hub: 'SSD5',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '62000',
				max_zip: '62999',
				zone: 'Gotland (Visby)',
				hub: 'SSD10',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '63000',
				max_zip: '64999',
				zone: 'Eskilstuna',
				hub: 'SSD1',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '65000',
				max_zip: '69199',
				zone: 'Karlstad',
				hub: 'SSD6',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '69200',
				max_zip: '69999',
				zone: 'Linköping',
				hub: 'SSD5',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '77000',
				max_zip: '74699',
				zone: 'Eskilstuna (Västerås)',
				hub: 'SSD1',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '74900',
				max_zip: '74999',
				zone: 'Eskilstuna (Västerås)',
				hub: 'SSD1',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '74000',
				max_zip: '74399',
				zone: 'Stockholm (Årsta)',
				hub: 'SSD11',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '74700',
				max_zip: '74899',
				zone: 'Stockholm (Årsta)',
				hub: 'SSD11',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '75000',
				max_zip: '76999',
				zone: 'Stockholm (Årsta)',
				hub: 'SSD11',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '77000',
				max_zip: '77159',
				zone: 'Borlänge',
				hub: 'SSD17',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '77180',
				max_zip: '79294',
				zone: 'Borlänge',
				hub: 'SSD17',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '79296',
				max_zip: '79999',
				zone: 'Borlänge',
				hub: 'SSD17',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '80000',
				max_zip: '82999',
				zone: 'Gävle',
				hub: 'SSD8',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '83000',
				max_zip: '83390',
				zone: 'Norrland Sundsvall',
				hub: 'SSD9',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '83351',
				max_zip: '83351',
				zone: 'Norrland Umeå?',
				hub: 'SSD15',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '83359',
				max_zip: '83359',
				zone: 'Norrland Umeå?',
				hub: 'SSD15',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '83391',
				max_zip: '83391',
				zone: 'Norrland Umeå?',
				hub: 'SSD15',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '83352',
				max_zip: '88999',
				zone: 'Norrland Sundsvall',
				hub: 'SSD9',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '89000',
				max_zip: '89999',
				zone: 'Örnsköldsvik',
				hub: 'SSD18',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '90000',
				max_zip: '91993',
				zone: 'Norrland Umeå?',
				hub: 'SSD15',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '91994',
				max_zip: '91994',
				zone: 'Örnsköldsvik',
				hub: 'SSD18',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '91995',
				max_zip: '93999',
				zone: 'Norrland Umeå?',
				hub: 'SSD15',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				min_zip: '94000',
				max_zip: '99999',
				zone: 'Norrland Luleå?',
				hub: 'SSD16',
				created_at: new Date(),
				updated_at: new Date(),
			},

		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('skanlog_se_hub', null, {});
	}
};
