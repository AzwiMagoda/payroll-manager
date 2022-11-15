export interface RegisterDto {
	password: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	role: string;
}

export class RegisterDto implements RegisterDto {
	constructor(
		password: string,
		firstName: string,
		lastName: string,
		phoneNumber: string,
		role: string
	) {
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.role = role;
	}
}
