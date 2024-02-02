import { OrderItem } from 'sequelize/types';

export const getSortCriteria = (sortBy?: string, orderBy?: string): Array<OrderItem> => {
	const orderCriteria = orderBy ?? '1';
	if (sortBy && sortBy !== '') {
		return [[sortBy, orderCriteria === '1' ? 'ASC' : 'DESC']];
	}

	return [];
};
