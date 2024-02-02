import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('delivery_countries', [
			{
				id: 1,
				country_id: '1',
				delivery_method_id: '38',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				country_id: '2',
				delivery_method_id: '40',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 3,
				country_id: '2',
				delivery_method_id: '41',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 4,
				country_id: '2',
				delivery_method_id: '42',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 5,
				country_id: '2',
				delivery_method_id: '43',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 6,
				country_id: '3',
				delivery_method_id: '45',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 7,
				country_id: '3',
				delivery_method_id: '46',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 8,
				country_id: '3',
				delivery_method_id: '47',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 9,
				country_id: '1',
				delivery_method_id: '50',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 10,
				country_id: '4',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 11,
				country_id: '5',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 12,
				country_id: '6',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 13,
				country_id: '7',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 14,
				country_id: '8',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 15,
				country_id: '9',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 16,
				country_id: '10',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 17,
				country_id: '11',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 18,
				country_id: '12',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 19,
				country_id: '1',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 20,
				country_id: '13',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 21,
				country_id: '14',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 22,
				country_id: '15',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 23,
				country_id: '16',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 24,
				country_id: '17',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 25,
				country_id: '18',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 26,
				country_id: '19',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 27,
				country_id: '40',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 28,
				country_id: '20',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 29,
				country_id: '21',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 30,
				country_id: '22',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 31,
				country_id: '23',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 32,
				country_id: '24',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 33,
				country_id: '25',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 34,
				country_id: '26',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 35,
				country_id: '27',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 36,
				country_id: '28',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 37,
				country_id: '3',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 38,
				country_id: '29',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 39,
				country_id: '30',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 40,
				country_id: '31',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 41,
				country_id: '32',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 42,
				country_id: '33',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 43,
				country_id: '2',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 44,
				country_id: '34',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 45,
				country_id: '35',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 46,
				country_id: '36',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 47,
				country_id: '37',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 48,
				country_id: '38',
				delivery_method_id: '48',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 49,
				country_id: '1',
				delivery_method_id: '51',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 50,
				country_id: '4',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 51,
				country_id: '5',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 52,
				country_id: '39',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 53,
				country_id: '7',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 54,
				country_id: '8',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 55,
				country_id: '9',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 56,
				country_id: '10',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 57,
				country_id: '11',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 58,
				country_id: '12',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 59,
				country_id: '1',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 60,
				country_id: '13',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 61,
				country_id: '14',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 62,
				country_id: '15',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 63,
				country_id: '16',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 64,
				country_id: '17',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 65,
				country_id: '18',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 66,
				country_id: '19',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 67,
				country_id: '40',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 68,
				country_id: '20',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 69,
				country_id: '21',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 70,
				country_id: '22',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 71,
				country_id: '23',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 72,
				country_id: '24',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 73,
				country_id: '25',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 74,
				country_id: '26',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 75,
				country_id: '27',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 76,
				country_id: '28',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 77,
				country_id: '3',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 78,
				country_id: '29',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 79,
				country_id: '30',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 80,
				country_id: '31',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 81,
				country_id: '32',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 82,
				country_id: '33',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 83,
				country_id: '2',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 84,
				country_id: '34',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 85,
				country_id: '35',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 86,
				country_id: '36',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 87,
				country_id: '37',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 88,
				country_id: '38',
				delivery_method_id: '49',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 89,
				country_id: '1',
				delivery_method_id: '52',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 90,
				country_id: '4',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 91,
				country_id: '43',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 92,
				country_id: '5',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 93,
				country_id: '6',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 94,
				country_id: '7',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 95,
				country_id: '8',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 96,
				country_id: '9',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 97,
				country_id: '10',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 98,
				country_id: '11',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 99,
				country_id: '12',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 100,
				country_id: '39',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 101,
				country_id: '1',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 102,
				country_id: '13',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 103,
				country_id: '14',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 104,
				country_id: '15',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 105,
				country_id: '16',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 106,
				country_id: '44',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 107,
				country_id: '42',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 108,
				country_id: '17',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 109,
				country_id: '18',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 110,
				country_id: '19',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 111,
				country_id: '40',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 112,
				country_id: '20',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 113,
				country_id: '21',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 114,
				country_id: '22',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 115,
				country_id: '23',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 116,
				country_id: '24',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 117,
				country_id: '25',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 118,
				country_id: '26',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 119,
				country_id: '27',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 120,
				country_id: '41',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 121,
				country_id: '28',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 122,
				country_id: '3',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 123,
				country_id: '29',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 124,
				country_id: '30',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 125,
				country_id: '31',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 126,
				country_id: '32',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 127,
				country_id: '33',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 128,
				country_id: '2',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 129,
				country_id: '34',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 130,
				country_id: '35',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 131,
				country_id: '36',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 132,
				country_id: '37',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 133,
				country_id: '38',
				delivery_method_id: '53',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 134,
				country_id: '42',
				delivery_method_id: '55',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 135,
				country_id: '4',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 136,
				country_id: '5',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 137,
				country_id: '6',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 138,
				country_id: '7',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 139,
				country_id: '8',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 140,
				country_id: '9',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 141,
				country_id: '10',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 142,
				country_id: '11',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 143,
				country_id: '12',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 144,
				country_id: '39',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 145,
				country_id: '1',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 146,
				country_id: '13',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 147,
				country_id: '14',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 148,
				country_id: '15',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 149,
				country_id: '16',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 150,
				country_id: '42',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 151,
				country_id: '17',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 152,
				country_id: '18',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 153,
				country_id: '19',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 154,
				country_id: '40',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 155,
				country_id: '20',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 156,
				country_id: '21',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 157,
				country_id: '22',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 158,
				country_id: '23',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 159,
				country_id: '24',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 160,
				country_id: '25',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 161,
				country_id: '26',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 162,
				country_id: '27',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 163,
				country_id: '28',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 164,
				country_id: '3',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 165,
				country_id: '29',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 166,
				country_id: '30',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 167,
				country_id: '31',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 168,
				country_id: '32',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 169,
				country_id: '2',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 170,
				country_id: '34',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 171,
				country_id: '35',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 172,
				country_id: '36',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 173,
				country_id: '37',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 174,
				country_id: '38',
				delivery_method_id: '57',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 175,
				country_id: '4',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 176,
				country_id: '43',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 177,
				country_id: '5',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 178,
				country_id: '6',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 179,
				country_id: '7',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 180,
				country_id: '8',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 181,
				country_id: '9',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 182,
				country_id: '10',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 183,
				country_id: '11',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 184,
				country_id: '12',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 185,
				country_id: '39',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 186,
				country_id: '1',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 187,
				country_id: '13',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 188,
				country_id: '14',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 189,
				country_id: '15',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 190,
				country_id: '16',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 191,
				country_id: '42',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 192,
				country_id: '17',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 193,
				country_id: '18',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 194,
				country_id: '19',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 195,
				country_id: '40',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 196,
				country_id: '20',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 197,
				country_id: '21',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 198,
				country_id: '22',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 199,
				country_id: '23',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 200,
				country_id: '24',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 201,
				country_id: '25',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 202,
				country_id: '26',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 203,
				country_id: '27',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 204,
				country_id: '41',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 205,
				country_id: '28',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 206,
				country_id: '3',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 207,
				country_id: '29',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 208,
				country_id: '30',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 209,
				country_id: '31',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 210,
				country_id: '32',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 211,
				country_id: '33',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 212,
				country_id: '2',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 213,
				country_id: '34',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 214,
				country_id: '35',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 215,
				country_id: '36',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 216,
				country_id: '37',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 217,
				country_id: '38',
				delivery_method_id: '62',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 218,
				country_id: '6',
				delivery_method_id: '66',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 219,
				country_id: '10',
				delivery_method_id: '66',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 220,
				country_id: '39',
				delivery_method_id: '66',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 221,
				country_id: '28',
				delivery_method_id: '66',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 222,
				country_id: '6',
				delivery_method_id: '67',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 223,
				country_id: '10',
				delivery_method_id: '67',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 224,
				country_id: '39',
				delivery_method_id: '67',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 225,
				country_id: '28',
				delivery_method_id: '67',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 226,
				country_id: '1',
				delivery_method_id: '74',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 227,
				country_id: '38',
				delivery_method_id: '75',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 228,
				country_id: '4',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 229,
				country_id: '43',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 230,
				country_id: '5',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 231,
				country_id: '6',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 232,
				country_id: '7',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 233,
				country_id: '8',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 234,
				country_id: '9',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 235,
				country_id: '10',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 236,
				country_id: '11',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 237,
				country_id: '12',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 238,
				country_id: '39',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 239,
				country_id: '1',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 240,
				country_id: '13',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 241,
				country_id: '14',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 242,
				country_id: '15',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 243,
				country_id: '16',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 244,
				country_id: '42',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 245,
				country_id: '17',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 246,
				country_id: '18',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 247,
				country_id: '19',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 248,
				country_id: '40',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 249,
				country_id: '20',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 250,
				country_id: '21',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 251,
				country_id: '22',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 252,
				country_id: '23',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 253,
				country_id: '24',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 254,
				country_id: '25',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 255,
				country_id: '26',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 256,
				country_id: '27',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 257,
				country_id: '41',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 258,
				country_id: '28',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 259,
				country_id: '3',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 260,
				country_id: '29',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 261,
				country_id: '30',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 262,
				country_id: '31',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 263,
				country_id: '32',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 264,
				country_id: '33',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 265,
				country_id: '2',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 266,
				country_id: '34',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 267,
				country_id: '35',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 268,
				country_id: '36',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 269,
				country_id: '37',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 270,
				country_id: '38',
				delivery_method_id: '83',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 271,
				country_id: '1',
				delivery_method_id: '82',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('delivery_countries', null, {});
	}
};
