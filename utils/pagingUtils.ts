interface PaginatedResult {
	count: number;
	rows: Array<any>;
}
export const getPagination = (page: number = 0, size: number = 10) => {
	const offset = page ? (page - 1) * size : 0;
	return { limit: size, offset };
};
export const getPagingData = (result: PaginatedResult, page: number, limit: number = 10) => {
	const { count, rows: data } = result;
	const currentPage = page || 1;
	const totalPages = Math.ceil(count / limit);

	return {
		count, data, totalPages, currentPage
	};
};
