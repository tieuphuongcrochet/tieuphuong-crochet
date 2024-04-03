export interface Pagination {
	last: boolean;
	pageNo: number;
	pageSize: number;
	totalElements: number;
	totalPages: number;
}

export interface ListResponse<T> {
	contents: T[];
	last: boolean;
	pageNo: number;
	pageSize: number;
	totalElements: number;
	totalPages: number;
};

export interface ListParams {
	_pageNo: number;
	_pageSize: number;
	_sortBy?: string;
	_sortDir?: 'asc' | 'desc';
	filters?: Filter[];
	[key: string]: any;
	categoryIds?: string[]
};

export const initialListParams: ListParams = {
	_pageNo: 0,
	_pageSize: 10,
	_sortBy: 'id',
	_sortDir: 'asc',
	searchText: '',
	filters: []
};

export const initialUserListParams: ListParams = {
	_pageNo: 0,
	_pageSize: 10,
	_sortBy: 'id',
	_sortDir: 'asc',
	searchText: '',
	filters: [],
	categoryIds: []
};

export interface ListTablePayload<T> {
	data: T[];
	total: number;
}

export interface FileUpload {
	fileContent: string;
	fileName: string;
	url: string;
};

export interface Filter {
	field?: string;
	operator?: string;
	value?: string;
	values?: string[];
}
