import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { Login } from '../models/login';
import { RegisterDto } from '../models/register';
import { User } from '../models/user';
import { UserDetails } from '../models/userDetails';
import { store } from './store';

export default class AuthStore {
	user: User | null = null;
	users = new Array<UserDetails>();
	loading = false;
	loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	login = async (login: Login) => {
		this.loading = true;
		try {
			if (!this.user) {
				const user = await agent.Auth.login(login);
				store.commonStore.setToken(user.token);
				await store.employeeStore.getCurrentEmployee();
				runInAction(() => {
					this.user = user;
					window.localStorage.setItem('user', JSON.stringify(user));
					this.loading = false;
					toast.success('Success!');
				});
			}
		} catch (error: any) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
			toast.error('There was a problem signing you in');
		}
	};

	logout = async () => {
		await agent.Auth.logout();

		store.commonStore.setToken(null);
		window.localStorage.removeItem('jwt');
		window.localStorage.removeItem('employeeDetails');
		window.localStorage.removeItem('user');
		this.user = null;
		store.employeeStore.employeeLogOut();
	};

	setUser = (user: User) => {
		this.user = user;
	};

	setLoading = (loading: boolean) => {
		this.loading = loading;
	};

	getUserList = async () => {
		this.loading = true;
		try {
			const users = await agent.Auth.getUserList();

			runInAction(() => {
				this.loading = false;
				this.users = users;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updateStatus = async (userId: string) => {
		this.loading = true;
		try {
			const response = agent.Auth.updateStatus(userId);

			toast.promise(response, {
				pending: 'Submitting...',
				success: 'Status updated successfully!',
				error: 'Failed to update status',
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

	updateDetails = async (user: UserDetails) => {
		this.loading = true;
		try {
			const response = agent.Auth.updateDetails(user);

			toast.promise(response, {
				pending: 'Submitting...',
				success: 'User updated successfully!',
				error: 'Failed to update user',
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

	createUser = async (register: RegisterDto) => {
		this.loading = true;
		try {
			const response = agent.Auth.createUser(register);

			toast.promise(response, {
				pending: 'Creating user...',
				success: 'User created successfully!',
				error: 'Failed to create user',
			});

			runInAction(() => {
				this.loading = false;
			});
			return response;
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};
}
