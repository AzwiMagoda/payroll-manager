import { makeAutoObservable, runInAction } from 'mobx';
import { getEmployee, getContactDetails } from '../functions/employeeFunctions';
import { ContactDetailsDto } from '../models/contactDetailsDto';
import { Employee } from '../models/employee';

export default class EmployeeProfileStore {
	selectedEmployee: Employee | undefined = undefined;
	contactDetails: ContactDetailsDto | undefined = undefined;

	constructor() {
		makeAutoObservable(this);
	}

	getEmployeeDetails = async (employeeId: string) => {
		this.setSelectedEmployee(undefined);
		const employee = await getEmployee(employeeId);

		this.setSelectedEmployee(employee);
	};

	getContactDetails = async (employeeId: string) => {
		this.setContactDetails(undefined);
		const contactDetails = await getContactDetails(employeeId);

		this.setContactDetails(contactDetails);
	};

	setSelectedEmployee = (value: Employee | undefined) => {
		this.selectedEmployee = value;
	};

	setContactDetails = (value: ContactDetailsDto | undefined) => {
		this.contactDetails = value;
	};
}
