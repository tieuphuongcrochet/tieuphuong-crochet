export interface PaginationParams {
	_limit: number;
	_page: number;
	_total: number;
}

export interface ListResponse<T> {
	data: T[],
	pagination: PaginationParams
};

export interface ListParams {
	_pageNo: number;
	_pageSize: number;
	_sortBy: string;
	_sortDir: 'asc' | 'desc';
	[key: string]: any;
};
