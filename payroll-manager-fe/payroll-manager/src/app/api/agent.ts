import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookedLeaveDays } from '../models/bookedLeaveDays';
import { ContactDetailsForm } from '../models/contactDetailsForm';
import { Dependant } from '../models/dependant';
import { Employee } from '../models/employee';
import { LeaveDays } from '../models/leaveDays';
import { PersonalInfoForm } from '../models/personalInfoForm';
import { TeamMembers } from '../models/teamMembers';
import { Payslip } from '../models/payslip';
import { Login } from '../models/login';
import { User } from '../models/user';
import { NotificationDto } from '../models/notification';

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

const api = axios.create({
	baseURL: 'https://localhost:44361/',
});

api.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem('jwt');
		if (token) {
			config.headers!['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	async (response) => {
		await sleep(1000);
		return response;
	},
	(error: AxiosError) => {
		const { data, status, config } = error.response!;
		switch (status) {
			case 401:
				console.log('hey its a 401');
				localStorage.clear();
				return (window.location.href = '/');
			// case 404:
			// 	console.log('hey its a 404');
			// 	return (window.location.href = '/error404');
		}
	}
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
	get: <T>(url: string) => api.get<T>(url).then(responseBody),
	post: <T>(url: string, body: {}) => api.post<T>(url, body).then(responseBody),
	postNoBody: <T>(url: string) => api.post<T>(url).then(responseBody),
	put: <T>(url: string, body: {}) => api.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => api.delete<T>(url).then(responseBody),
};

const Auth = {
	login: (login: Login) => requests.post<User>('auth/login', login),
	logout: () => requests.postNoBody<User>('auth/logout'),
};

const Employees = {
	getAllEmployees: () => requests.get<Employee[]>('employee/getAll'),
	getEmployeeById: (id: string) => requests.get<Employee>(`employee/${id}`),
	// addNewEmployee: (employee: Employee) =>
	// 	requests.post<Employee>('/Employee/CreateEmployee', employee),
	updateEmployeeDetails: (employee: Employee) =>
		requests.put<void>(`employee/update`, employee),
	// deleteEmployee: (id: string) =>
	// 	requests.del<void>(`/Employee/DeleteEmployee/${id}`),
	updatePersonalInformation: (info: PersonalInfoForm, id: string) =>
		requests.put<Employee>(`employee/update/personalinfo/{id}`, info),
	updateContactDetails: (info: ContactDetailsForm, id: string) =>
		requests.put<Employee>(`employee/update/contactdetails/${id}`, info),
	getAllDependants: (id: string) =>
		requests.get<Dependant[]>(`/Employee/GetDependants/${id}`),
	addNewDependant: (dependant: Dependant) =>
		requests.post<Dependant[]>('/Employee/CreateDependant', dependant),
	updateDependant: (dependant: Dependant) =>
		requests.put<Dependant[]>(`/Employee/UpdateDependant`, dependant),
	deleteDependant: (id: string) =>
		requests.del<void>(`/Employee/DeleteDependant/${id}`),
	getNotifications: (id: string) =>
		requests.get<NotificationDto[]>(`employee/getNotifications/${id}`),
};

const Leave = {
	getLeaveDays: (employeeId: string) =>
		requests.get<LeaveDays>(`leave/balance/${employeeId}`),
	getBookedLeaveDays: (employeeId: string) =>
		requests.get<BookedLeaveDays[]>(`booked/${employeeId}`),
	bookLeave: (leaveDays: BookedLeaveDays, employeeId: string) =>
		requests.post<string>(`leave/book/${employeeId}`, leaveDays),
	updateLeave: (leaveDays: BookedLeaveDays, employeeId: string) =>
		requests.put<LeaveDays>(`leave/update/${employeeId}`, leaveDays),
	deleteLeave: (leaveId: string, employeeId: string) =>
		requests.del<string>(`leave/cancel/${employeeId}/${leaveId}`),
	getEmployeeBookedLeaveDays: (managerId: string) =>
		requests.get<BookedLeaveDays[]>(`/manager/booked/${managerId}`),
	approveLeave: (leaveIds: string[]) =>
		requests.put(`/manager/approve`, leaveIds),
};

const Team = {
	getAllTeamMembers: (teamName: string) =>
		requests.get<TeamMembers[]>(`team/${teamName}`),
};

const Payslips = {
	getAllPayslips: (employeeId: string) =>
		requests.get<Payslip[]>(`payslip/${employeeId}`),
	getLatestPayslip: (employeeId: string) =>
		requests.get<Payslip>(`payslip/latest/${employeeId}`),
};

const agent = {
	Auth,
	Employees,
	Leave,
	Team,
	Payslips,
};

export default agent;
