export interface CreateEmployee {
	id?: string;
	title: string;
	name: string;
	surname: string;
	department: string;
	jobTitle: string;
}

export class CreateEmployee implements CreateEmployee {
	constructor(
		title: string,
		name: string,
		surname: string,
		department: string,
		jobTitle: string,
		id?: string
	) {
		this.id = id;
		this.title = title;
		this.name = name;
		this.surname = surname;
		this.department = department;
		this.jobTitle = jobTitle;
	}
}
