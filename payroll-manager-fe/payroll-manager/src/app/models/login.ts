export interface Login {
	email: string;
	password: string;
}

export class Login implements Login {
	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}
