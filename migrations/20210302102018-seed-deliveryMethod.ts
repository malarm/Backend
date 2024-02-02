import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('delivery_method', [
			{
				id: 38,
				title: 'GLS - Levering til hjemmeadressen',
				logo: 'gls-icon.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 40,
				title: 'Sverige - GLS - Pakkeboks',
				delivery_price: '253',
				logo: 'gls-icon.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 41,
				title: 'Sverige - GLS - Erhvervslevering',
				delivery_price: '569',
				logo: 'gls-icon.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 42,
				title: 'Sverige - Afhentning - På lageret i Hillerød',
				logo: 'people-carry.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 43,
				title: 'Sverige - DSV - Pallegods',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 45,
				title: 'Norge - GLS - Levering til pakkeshop',
				logo: 'gls-icon.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 46,
				title: 'Norge - GLS - Erhvervslevering',
				logo: 'gls-icon.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 47,
				title: 'Norge - DSV - Pallegods',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 48,
				title: 'UK - DSV - Pallegods',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 49,
				title: 'UK - GLS - Privat- og erhvervslevering',
				logo: 'gls-icon.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 50,
				title: 'GLS - Levering til pakkeshop',
				logo: 'gls-icon.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 51,
				title: 'GLS - Levering til arbejdsplads',
				logo: 'gls-icon.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 52,
				title: 'Levering til kantsten (hverdage kl. 7-19)',
				logo: 'gls-icon.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 53,
				title: 'Afhentes på lager: Rønnevangsalle 8, 3400 Hillerød',
				logo: 'people-carry.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 54,
				title: 'Pallegods til Grønland og Færøerne',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 55,
				title: 'GLS - Levering til Grønland og Færøerne',
				logo: 'gls-icon.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 57,
				title: 'Gavekort',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 58,
				title: 'Postnord Pakkeshop',
				logo: 'postnord.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 59,
				title: 'Wholesalekunder - DSV',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 60,
				title: 'Wholesalekunder GULDSMEDE - DSV',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 61,
				title: 'Wholesale UK - GLS - Gratis lev',
				logo: 'gls-icon.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 62,
				title: 'Wholesale - Fragt tilføjes senere',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 63,
				title: 'Wholesale - DSV (KUN VINKØLESKABE)',
				logo: 'pallet.png',
				delivery_price: '8',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 64,
				title: 'Wholesale - DSV (KUN UK VINKØLESKABE)',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 65,
				title: 'Fysisk gavekort tilsendt i flot gaveæske',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 66,
				title: 'DE + NL - GLS - Privat- og erhvervslevering',
				logo: 'gls-icon.png',
				delivery_price: '25',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 67,
				title: 'DE + NL - DSV - Pallegods',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 68,
				title: 'Tidsbestemt levering og indbæring af 1 person - Mandag - Fredag',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 69,
				title: 'Tidsbestemt levering og indbæring af 1 person - Lørdag - Søndag',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 70,
				title: 'Tidsbestemt levering og indbæring af 1 person - Mandag - Fredag',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 71,
				title: 'Tidsbestemt levering og indbæring af 1 person - Lørdag - Søndag',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 74,
				title: 'Levering og indbæring af 1 person (hverdage kl. 7-19)',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 75,
				title: 'UK - Carry-in',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 82,
				title: 'Levering og indbæring af 2 personer (hverdage kl. 7-19)',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 83,
				title: 'Amazon FBA',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 84,
				title: 'Sverige - Levering og indbæring af 1 person (hverdage kl. 7-19)',
				logo: 'pallet.png',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('delivery_method', null, {});
	}
};