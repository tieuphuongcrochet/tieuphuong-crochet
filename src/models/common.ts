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
	filters: Filter[];
};

export const initialListParams: ListParams = {
	_pageNo: 0,
	_pageSize: 30,
	_sortBy: 'createdDate',
	_sortDir: 'desc',
	filters: []
};

export const initialViewTableParams: ListParams = {
	_pageNo: 0,
	_pageSize: 48,
	_sortBy: 'createdDate',
	_sortDir: 'desc',
	filters: []
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
	filterLogic: string;
	filterCriteria: FilterCriteria[];
}

export interface FilterCriteria {
	key: string;
	operation: string;
	value: string | number | string[] | number[];
}

export type UploadMode = 'directory' | 'crop' | 'normal';

export const UPLOAD_MODES = {
	DIRECTORY: 'directory',
	CROP: 'crop',
	NORMAL: 'normal'
};

