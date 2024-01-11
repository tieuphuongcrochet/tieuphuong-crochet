export interface User {
	id?: number | string;
	name?: string;
	email: string;
	role: string;
}

export interface LoginParams {
	email: string;
	password: string
}

export interface LoginPayload {
	params: LoginParams;
	callback: Function
};

export interface LoginRes {
	accessToken: string;
	tokenType: string;
	email: string;
	role: string;
}
