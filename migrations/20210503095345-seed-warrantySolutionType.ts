import { QueryInterface, Sequelize } from 'sequelize';

export = {
	up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkInsert('warranty_solution_types', [
			{
				id: 0,
				title: 'Unsolved',
				default_status: 0,
				can_be_added: 0,
				final: 0,
				allow_after_final: 0,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 1,
				title: 'Compensated',
				default_status: 0,
				can_be_added: 1,
				final: 0,
				allow_after_final: 1,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				title: 'Repaired',
				default_status: 0,
				can_be_added: 1,
				final: 0,
				allow_after_final: 0,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 3,
				title: 'Replaced',
				default_status: 0,
				can_be_added: 1,
				final: 1,
				allow_after_final: 0,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 4,
				title: 'Credited',
				default_status: 0,
				can_be_added: 1,
				final: 1,
				allow_after_final: 0,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 5,
				title: 'No solution necessary',
				default_status: 1,
				can_be_added: 1,
				final: 0,
				allow_after_final: 0,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
		await queryInterface.bulkDelete('warranty_solution_types', null, {});
	}
};
