
export const API_URL = {
	HOME: '/home',
	PRODUCT: '/product',
	PATTERN: '/pattern',
	FREE_PATTERN: '/free-pattern',
	BLOG: '/blog',
	USER: '/users',

	// Category
	CATEGORY: '/category',
	// Get sub categories
	SUB_CATEGORY: '/category/get-sub-categories',
	// Get parent categories
	PARENT_CATEGORY: '/category/get-parent-categories',
	ALL_CATEGORY: '/category/get-all-categories',

	// Common CRUD
	CREATE: 'create',
	DETAIL: 'detail',
	UPDATE: 'update',
	DELETE: 'delete',
	PAGINATION: 'pagination',

	// Auth
	LOGIN: 'auth/login',
	SIGNUP: 'auth/signup',
	LOGOUT: 'auth/login',
	RESET_PASSWORD: 'auth/login',
	REFRESH_TOKEN: 'auth/refresh-token',
	UPLOAD_FILE: 'firebase-storage/upload-file',
	DELETE_MULTIPLE_FILES: 'firebase-storage/delete-multiple-files'
}
