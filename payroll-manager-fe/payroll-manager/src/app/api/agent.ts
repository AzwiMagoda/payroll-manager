import axios, { AxiosError, AxiosResponse } from 'axios';
import { BookedLeaveDays } from '../models/bookedLeaveDays';
import { Dependant } from '../models/dependant';
import { Employee } from '../models/employee';
import { LeaveDays } from '../models/leaveDays';
import { TeamMembers } from '../models/teamMembers';
import { Payslip } from '../models/payslip';
import { Login } from '../models/login';
import { User } from '../models/user';
import { NotificationDto } from '../models/notification';
import { BookLeave } from '../models/bookLeave';
import { DeclineLeave } from '../models/DeclineLeave';
import { Remuneration } from '../models/remuneration';
import { RemunerationGraph } from '../models/remunerationGraph';
import { UserDetails } from '../models/userDetails';
import { RegisterDto } from '../models/register';
import { ListDto } from '../models/listDto';
import { ContactDetailsDto } from '../models/contactDetailsDto';

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
				localStorage.clear();
				return (window.location.href = '/');
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
	getUserList: () => requests.get<UserDetails[]>('auth/userList'),
	updateDetails: (user: UserDetails) =>
		requests.put<LeaveDays>(`auth/updateDetails`, user),
	updateStatus: (userId: string) =>
		requests.put<LeaveDays>(`auth/updateStatus/${userId}`, {}),
	createUser: (register: RegisterDto) =>
		requests.post<string>(`auth/register`, register),
};

const Employees = {
	createEmployee: (employee: Employee) =>
		requests.post<string>(`employee/create`, employee),
	updateEmployee: (employee: Employee) =>
		requests.put<string>(`employee/update`, employee),
	getAllEmployees: () => requests.get<Employee[]>('employee/getAll'),
	getCurrentEmployee: () => requests.get<Employee>(`employee/current`),
	getEmployee: (employeeId: string) =>
		requests.get<Employee>(`employee/${employeeId}`),
	updateEmployeeDetails: (employee: Employee) =>
		requests.put<void>(`employee/update`, employee),
	updateContactDetails: (info: ContactDetailsDto) =>
		requests.put<Employee>(`employee/update/contactdetails`, info),
	getAllDependants: () => requests.get<Dependant[]>(`/Employee/GetDependants`),
	addNewDependant: (dependant: Dependant) =>
		requests.post<Dependant[]>('/Employee/CreateDependant', dependant),
	updateDependant: (dependant: Dependant) =>
		requests.put<Dependant[]>(`/Employee/UpdateDependant`, dependant),
	deleteDependant: () => requests.del<void>(`/Employee/DeleteDependant`),
	getNotifications: () =>
		requests.get<NotificationDto[]>(`employee/getNotifications`),
};

const Leave = {
	getLeaveDays: () => requests.get<LeaveDays>(`leave/balance`),
	getBookedLeaveDays: () => requests.get<BookedLeaveDays[]>(`booked`),
	bookLeave: (leaveDays: BookLeave) =>
		requests.post<string>(`leave/book`, leaveDays),
	updateLeave: (leaveDays: BookedLeaveDays) =>
		requests.put<LeaveDays>(`leave/update`, leaveDays),
	deleteLeave: (leaveId: string) =>
		requests.del<string>(`leave/cancel/${leaveId}`),
	getEmployeeBookedLeaveDays: () =>
		requests.get<BookedLeaveDays[]>(`manager/booked`),
	approveLeave: (leaveIds: string[]) =>
		requests.put(`manager/approve`, leaveIds),
	declineLeave: (leaveDays: DeclineLeave) =>
		requests.put(`manager/decline`, leaveDays),
};

const Team = {
	getAllTeamMembers: (teamName: string) =>
		requests.get<TeamMembers[]>(`team/${teamName}`),
};

const Payslips = {
	getAllPayslips: () => requests.get<Payslip[]>(`payslips`),
	getLatestPayslip: () => requests.get<Payslip>(`payslips/latest`),
};

const Remunerations = {
	getRemuneration: () => requests.get<Remuneration>(`remuneration`),
	getRemunerationGraphData: () =>
		requests.get<RemunerationGraph>(`remuneration/graphData`),
};

const General = {
	getTitle: () => requests.get<string[]>(`general/titleList`),
	getEmployeeTypeList: () => requests.get<string[]>(`general/employeeTypeList`),
	getManagerList: () => requests.get<ListDto[]>(`general/managerList`),
	getTeamList: () => requests.get<ListDto[]>(`general/teamList`),
	getTeamListDepartment: (department: string) =>
		requests.get<ListDto[]>(`general/teamList/${department}`),
	getDepartmentList: () => requests.get<ListDto[]>(`general/departmentList`),
};

const agent = {
	Auth,
	Employees,
	Leave,
	Team,
	Payslips,
	Remunerations,
	General,
};

export default agent;
