import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Employee } from '../models/employee';

export default class EmployeeStore {
	selectedEmployee: Employee | undefined = undefined;
	employeeRegistry = new Map<string, Employee>();
	loading = false;
	loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	get employeeArray() {
		return Array.from(this.employeeRegistry.values());
	}

	getAllEmployees = async () => {
		this.loadingInitial = true;
		try {
			const employees = await agent.Employees.getAllEmployees();

			employees.forEach((employee) => {
				this.setEmployee(employee);
			});

			runInAction(() => {
				this.loadingInitial = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loadingInitial = false;
			});
		}
	};

	private setEmployee = (employee: Employee) => {
		this.employeeRegistry.set(employee.id!, employee);
	};
}
