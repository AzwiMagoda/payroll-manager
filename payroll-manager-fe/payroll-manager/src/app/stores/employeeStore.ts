import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Employee } from '../models/employee';

export default class EmployeeStore {
	selectedEmployee: Employee | undefined = undefined;
	employeeRegistry = new Map<string, Employee>();
	currentEmployee: Employee | undefined = undefined;
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

	setCurrentEmployee = async (id: string) => {
		this.loadingInitial = true;
		try {
			const employee = await agent.Employees.getEmployeeById(id);
			runInAction(() => {
				this.loadingInitial = false;
				this.currentEmployee = employee;
			});
			console.log(employee);
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

	employeeLogOut = () => {
		this.currentEmployee = undefined;
	};
}
