import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { BookedLeaveDays } from '../models/bookedLeaveDays';
import { ContactDetailsForm } from '../models/contactDetailsForm';
import { Dependant } from '../models/dependant';
import { Employee } from '../models/employee';
import { LeaveDays } from '../models/leaveDays';
import { PersonalInfoForm } from '../models/personalInfoForm';

export default class EmployeeStore {
	selectedEmployee: Employee | undefined = undefined;
	employeeRegistry = new Map<string, Employee>();
	dependants = new Array<Dependant>();
	currentEmployee: Employee | undefined = undefined;
	loading = false;
	hasNewDependant = false;
	newDependantId: string = '';
	leaveDays: LeaveDays | undefined = undefined;
	bookedLeaveDays = new Array<BookedLeaveDays>();

	constructor() {
		makeAutoObservable(this);
	}

	get employeeArray() {
		return Array.from(this.employeeRegistry.values());
	}

	addNewDependantToArray = (dependant: Dependant) => {
		this.dependants.push(dependant);
		this.newDependantId = dependant.id;
	};

	removeNewDependantFromArray = () => {
		this.dependants.pop();
		this.newDependantId = '';
	};

	setHasNewDependant = (status: boolean) => {
		this.hasNewDependant = status;
	};

	getAllEmployees = async () => {
		this.loading = true;
		try {
			const employees = await agent.Employees.getAllEmployees();

			employees.forEach((employee: Employee) => {
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
			const leaveDays = await agent.Employees.getLeaveDays(id);
			const bookedLeaveDays = await agent.Employees.getBookedLeaveDays(id);

			runInAction(() => {
				this.loading = false;
				this.currentEmployee = employee;
				this.leaveDays = leaveDays;
				this.bookedLeaveDays = bookedLeaveDays;
			});
			console.log(bookedLeaveDays);
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

	addNewDependant = async (dependant: Dependant) => {
		this.loading = true;
		try {
			console.log(dependant);
			const dependants = await agent.Employees.addNewDependant(dependant);

			runInAction(() => {
				this.dependants = dependants;
				this.loading = false;
				this.hasNewDependant = false;
			});
			console.log('hey');
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updateDependant = async (dependant: Dependant) => {
		this.loading = true;
		try {
			const dependants = await agent.Employees.updateDependant(dependant);
			runInAction(() => {
				this.loading = false;
				this.dependants = dependants;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	deleteDependant = async (id: string) => {
		this.loading = true;
		try {
			await agent.Employees.deleteDependant(id);
			runInAction(() => {
				this.loading = false;
				this.dependants = this.dependants.filter(
					(dependant) => dependant.id === id
				);
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
		this.hasNewDependant = false;
		this.newDependantId = '';
	};

	getLeaveDaysBalances = async (employeeId: string) => {
		this.loading = true;
		try {
			const leaveDays = await agent.Employees.getLeaveDays(employeeId);
			runInAction(() => {
				this.loading = false;
				this.leaveDays = leaveDays;
			});
			console.log(leaveDays);
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	getAllBookedLeaveDays = async (id: string) => {
		this.loading = true;
		try {
			const bookedDays = await agent.Employees.getBookedLeaveDays(id);

			runInAction(() => {
				this.bookedLeaveDays = bookedDays;
				this.loading = false;
			});
			console.log(bookedDays);
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};
}
