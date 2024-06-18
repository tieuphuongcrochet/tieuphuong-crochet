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
	searchText?: string;
	categoryId?: React.Key;
	[key: string]: any;
};

export const initialListParams: ListParams = {
	_pageNo: 0,
	_pageSize: 10,
	_sortBy: 'createdDate',
	_sortDir: 'desc',
	searchText: '',
	filters: [],
	categoryId: ''
};

export const initialViewTableParams: ListParams = {
	_pageNo: 0,
	_pageSize: 24,
	_sortBy: 'createdDate',
	_sortDir: 'desc',
	searchText: '',
	categoryId: ''
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

export type UploadMode = 'directory' | 'crop' | 'normal';

export const UPLOAD_MODES = {
	DIRECTORY: 'directory',
	CROP: 'crop',
	NORMAL: 'normal'
};

