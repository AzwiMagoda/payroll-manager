export interface Employee {
	id?: string;
	title?: string;
	name?: string;
	surname?: string;
	company?: string;
	manager?: string;
	department?: string;
	teamName?: string;
	jobTitle?: string;
	email?: string;
	telephone?: string;
	cellphone?: string;
	physicalAddress?: string;
	postalAddress?: string;
	createdDate?: string;
	managerEmployeeId?: string;
	employeeNumber?: string;
	employeeType?: string;
	jobType?: string;
	location?: string;
	hireDate?: Date;
	originalHireDate?: Date;
	teamId?: string;
}

// export class Employee implements Employee {
// 	constructor() {}
// }
