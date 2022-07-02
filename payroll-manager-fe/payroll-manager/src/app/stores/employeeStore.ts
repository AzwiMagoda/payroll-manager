import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { ContactDetailsForm } from '../models/contactDetailsForm';
import { Dependant } from '../models/dependant';
import { Employee } from '../models/employee';
import { PersonalInfoForm } from '../models/personalInfoForm';

export default class EmployeeStore {
	selectedEmployee: Employee | undefined = undefined;
	employeeRegistry = new Map<string, Employee>();
	dependants = new Array<Dependant>();
	currentEmployee: Employee | undefined = undefined;
	loading = false;
	hasNewDependant = false;

	constructor() {
		makeAutoObservable(this);
	}

	get employeeArray() {
		return Array.from(this.employeeRegistry.values());
	}

	addNewDependantToArray = (dependant: Dependant) => {
		this.dependants.push(dependant);
	};

	removeNewDependantFromArray = () => {
		this.dependants.pop();
	};

	setHasNewDependant = (status: boolean) => {
		this.hasNewDependant = status;
	};

	getAllEmployees = async () => {
		this.loading = true;
		try {
			const employees = await agent.Employees.getAllEmployees();

			employees.forEach((employee) => {
				this.setEmployee(employee);
			});

			runInAction(() => {
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	setCurrentEmployee = async (id: string) => {
		this.loading = true;
		try {
			const employee = await agent.Employees.getEmployeeById(id);
			runInAction(() => {
				this.loading = false;
				this.currentEmployee = employee;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updatePersonalInfo = async (info: PersonalInfoForm) => {
		this.loading = true;
		try {
			const employee = await agent.Employees.updatePersonalInformation(
				info,
				this.currentEmployee!.id
			);
			runInAction(() => {
				this.loading = false;
				this.currentEmployee = employee;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updateContactDetails = async (info: ContactDetailsForm) => {
		this.loading = true;
		try {
			const employee = await agent.Employees.updateContactDetails(
				info,
				this.currentEmployee!.id
			);
			runInAction(() => {
				this.loading = false;
				this.currentEmployee = employee;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	getAllDependants = async (id: string) => {
		this.loading = true;
		try {
			const dependants = await agent.Employees.getAllDependants(id);

			runInAction(() => {
				this.dependants = dependants;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
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
