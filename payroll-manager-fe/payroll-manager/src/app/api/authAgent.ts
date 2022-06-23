import axios, { AxiosResponse } from 'axios';
import { Login } from '../models/login';
import { User } from '../models/user';

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

const authApi = axios.create({
	baseURL: 'https://localhost:44346/api',
});

authApi.interceptors.response.use(async (response) => {
	await sleep(1000);
	return response;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
	get: <T>(url: string) => authApi.get<T>(url).then(responseBody),
	post: <T>(url: string, body: {}) =>
		authApi.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) =>
		authApi.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => authApi.delete<T>(url).then(responseBody),
};

const Auth = {
	login: (login: Login) => requests.post<User>('/Auth/Login', login),
};

const agent = {
	Auth,
};

export default agent;
