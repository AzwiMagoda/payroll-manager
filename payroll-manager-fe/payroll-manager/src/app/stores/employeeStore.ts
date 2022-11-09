import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { BookedLeaveDays } from '../models/bookedLeaveDays';
import { ContactDetailsForm } from '../models/contactDetailsForm';
import { Dependant } from '../models/dependant';
import { Employee } from '../models/employee';
import { LeaveDays } from '../models/leaveDays';
import { NotificationDto } from '../models/notification';
import { PersonalInfoForm } from '../models/personalInfoForm';
import { store } from './store';

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
	notifications = new Array<NotificationDto>();
	employeeLeaveDays = new Array<BookedLeaveDays>();

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

	getCurrentEmployee = async (id: string) => {
		this.loading = true;
		try {
			const employee = await agent.Employees.getEmployeeById(id);

			runInAction(() => {
				this.loading = false;
				this.currentEmployee = employee;
				window.localStorage.setItem(
					'employeeDetails',
					JSON.stringify(employee)
				);
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

	addNewDependant = async (dependant: Dependant) => {
		this.loading = true;
		try {
			const dependants = await agent.Employees.addNewDependant(dependant);

			runInAction(() => {
				this.dependants = dependants;
				this.loading = false;
				this.hasNewDependant = false;
			});
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
			const leaveDays = await agent.Leave.getLeaveDays(employeeId);
			runInAction(() => {
				this.loading = false;
				this.leaveDays = leaveDays;
			});
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
			const bookedDays = await agent.Leave.getBookedLeaveDays(id);

			runInAction(() => {
				this.bookedLeaveDays = bookedDays;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	bookLeave = async (leaveDays: BookedLeaveDays) => {
		this.loading = true;
		try {
			const bookedLeave = agent.Leave.bookLeave(
				leaveDays,
				this.currentEmployee!.id
			);
			toast.promise(bookedLeave, {
				pending: 'Submitting...',
				success: 'Leave day(s) successfully booked',
				error: 'Failed to book leave day(s)',
			});

			await this.getLeaveDaysBalances(this.currentEmployee!.id);

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

	updateLeave = async (leaveDays: BookedLeaveDays) => {
		this.loading = true;
		try {
			const bookedLeave = agent.Leave.updateLeave(
				leaveDays,
				this.currentEmployee!.id
			);
			toast.promise(bookedLeave, {
				pending: 'Updating...',
				success: 'Leave day(s) successfully updated',
				error: 'Failed to update leave day(s)',
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

	deleteLeave = async (leaveId: string) => {
		this.loading = true;
		try {
			const deleteLeave = agent.Leave.deleteLeave(
				leaveId,
				this.currentEmployee!.id
			);

			toast.promise(deleteLeave, {
				pending: 'Deleteing...',
				success: 'Leave day(s) successfully deleted',
				error: 'Failed to delete leave day(s)',
			});

			runInAction(() => {
				this.loading = false;
				this.bookedLeaveDays = this.bookedLeaveDays.filter(
					(leave) => leave.id === leaveId
				);
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	setCurrentEmployee = (employee: Employee) => {
		this.currentEmployee = employee;
	};

	getNotifications = async (id: string) => {
		this.loading = true;
		try {
			const notifications = await agent.Employees.getNotifications(id);
			// console.log(notifications);

			runInAction(() => {
				this.notifications = notifications;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	getEmployeeBookedLeaveDays = async () => {
		if (store.authStore.user?.role == 'Manager') {
			this.loading = true;
			try {
				const bookedDays = await agent.Leave.getEmployeeBookedLeaveDays(
					this.currentEmployee!.id
				);

				runInAction(() => {
					this.employeeLeaveDays = bookedDays;
					this.loading = false;
				});
			} catch (error) {
				console.log(error);
				runInAction(() => {
					this.loading = false;
				});
			}
		}
	};
}
