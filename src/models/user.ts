export interface User {
	id?: number | string;
	name?: string;
	email: string;
	role?: string;
	password?: string;
}

export interface AuthPayload {
	params: User;
	callback: Function
};

export interface LoginRes {
	accessToken: string;
	tokenType?: string;
	email?: string;
	role?: string;
	refreshToken: string;
}

export interface RefreshTokenRes{
	refreshToken: string;
	jwtToken: string;
}

export interface ErrorData {
	message: string;
	statusCode: string;
	code?: string;
	error?: string;
}
