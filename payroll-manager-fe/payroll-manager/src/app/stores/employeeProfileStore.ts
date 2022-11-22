import { makeAutoObservable, runInAction } from 'mobx';
import {
	getEmployee,
	getContactDetails,
	getRemunerationId,
} from '../functions/employeeFunctions';
import { ContactDetailsDto } from '../models/contactDetailsDto';
import { Employee } from '../models/employee';
import { Remuneration } from '../models/remuneration';

export default class EmployeeProfileStore {
	selectedEmployee: Employee | undefined = undefined;
	contactDetails: ContactDetailsDto | undefined = undefined;
	remuneration: Remuneration | undefined = undefined;

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

	getRemuneration = async (employeeId: string) => {
		this.setRemuneration(undefined);
		const remuneration = await getRemunerationId(employeeId);

		this.setRemuneration(remuneration);
	};

	setSelectedEmployee = (value: Employee | undefined) => {
		this.selectedEmployee = value;
	};

	setContactDetails = (value: ContactDetailsDto | undefined) => {
		this.contactDetails = value;
	};

	setRemuneration = (value: Remuneration | undefined) => {
		this.remuneration = value;
	};
}
