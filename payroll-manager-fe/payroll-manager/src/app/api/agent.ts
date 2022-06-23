import axios, { AxiosResponse } from 'axios';
import { Employee } from '../models/employee';

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

const employeeApi = axios.create({
	baseURL: 'https://localhost:44328/api',
});

employeeApi.interceptors.response.use(async (response) => {
	await sleep(1000);
	return response;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
	get: <T>(url: string) => employeeApi.get<T>(url).then(responseBody),
	post: <T>(url: string, body: {}) =>
		employeeApi.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) =>
		employeeApi.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => employeeApi.delete<T>(url).then(responseBody),
};

const Employees = {
	getAllEmployees: () => requests.get<Employee[]>('/Employee/GetAllEmployees'),
	getEmployeeById: (id: string) =>
		requests.get<Employee>(`/Employee/GetEmployee/${id}`),
	addNewEmployee: (employee: Employee) =>
		requests.post<Employee>('/Employee/CreateEmployee', employee),
	updateEmployeeDetails: (employee: Employee) =>
		requests.put<void>(`/Employee/UpdateEmployee`, employee),
	deleteEmployee: (id: string) =>
		requests.del<void>(`/Employee/DeleteEmployee/${id}`),
};

const agent = {
	Employees,
};

export default agent;
