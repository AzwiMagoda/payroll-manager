import axios, { AxiosResponse } from 'axios';
import { BookedLeaveDays } from '../models/bookedLeaveDays';
import { ContactDetailsForm } from '../models/contactDetailsForm';
import { Dependant } from '../models/dependant';
import { Employee } from '../models/employee';
import { LeaveDays } from '../models/leaveDays';
import { PersonalInfoForm } from '../models/personalInfoForm';

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
	delBody: <T>(url: string, body: {}) =>
		employeeApi.delete<T>(url, body).then(responseBody),
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
	updatePersonalInformation: (info: PersonalInfoForm, id: string) =>
		requests.put<Employee>(`/Employee/UpdatePersonalInformation/${id}`, info),
	updateContactDetails: (info: ContactDetailsForm, id: string) =>
		requests.put<Employee>(`/Employee/UpdateContactDetails/${id}`, info),
	getAllDependants: (id: string) =>
		requests.get<Dependant[]>(`/Employee/GetDependants/${id}`),
	addNewDependant: (dependant: Dependant) =>
		requests.post<Dependant[]>('/Employee/CreateDependant', dependant),
	updateDependant: (dependant: Dependant) =>
		requests.put<Dependant[]>(`/Employee/UpdateDependant`, dependant),
	deleteDependant: (id: string) =>
		requests.del<void>(`/Employee/DeleteDependant/${id}`),
	getLeaveDays: (employeeId: string) =>
		requests.get<LeaveDays>(`/Employee/GetEmployeeLeaveDays/${employeeId}`),
	getBookedLeaveDays: (employeeId: string) =>
		requests.get<BookedLeaveDays[]>(
			`/Employee/GetEmployeeBookedLeaveDays/${employeeId}`
		),
	bookLeave: (leaveDays: BookedLeaveDays, employeeId: string) =>
		requests.post<string>(`/Employee/BookLeave/${employeeId}`, leaveDays),
	updateLeave: (leaveDays: BookedLeaveDays, employeeId: string) =>
		requests.put<LeaveDays>(
			`/Employee/UpdateBookedLeave/${employeeId}`,
			leaveDays
		),
	deleteLeave: (leaveDays: BookedLeaveDays, employeeId: string) =>
		requests.delBody<string>(
			`/Employee/DeleteBookedLeave/${employeeId}`,
			leaveDays
		),
};

const agent: any = {
	Employees,
};

export default agent;
