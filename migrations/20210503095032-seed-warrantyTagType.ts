import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('warranty_tag_types', [
			{
				title: 'Customer need an update after tech',
				class: 'badge-secondary',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Sparepart f/ supplier',
				class: 'badge-success',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Waiting for own tech',
				class: 'badge-success',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Incomplete freight claim',
				class: 'badge-secondary',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Amazon',
				class: 'badge-dark',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'GLS missing parcel',
				class: 'badge-danger',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'MBS on it',
				class: 'badge-primary',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'TATH',
				class: 'badge-primary',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Insurance',
				class: 'badge-secondary',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'AK',
				class: 'badge-info',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'WB',
				class: 'badge-info',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'EICO',
				class: 'badge-info',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'RBC',
				class: 'badge-info',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Garant SE',
				class: 'badge-info',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Witt',
				class: 'badge-info',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Jessica',
				class: 'badge-primary',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Wine accessoires ',
				class: 'badge-primary',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Waiting for Levi',
				class: 'badge-success',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Awaiting customer reg. collection',
				class: 'badge-dark',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				title: 'Awaiting pictures for freight claim',
				class: 'badge-secondary',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('warranty_tag_types', null, {});
	}
};
