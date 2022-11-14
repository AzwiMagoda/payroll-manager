import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { Login } from '../models/login';
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
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
			toast.error('There was a problem signing you in');
		}
	};

	logout = async () => {
		store.commonStore.setToken(null);
		window.localStorage.removeItem('jwt');
		window.localStorage.removeItem('employeeDetails');
		window.localStorage.removeItem('user');
		this.user = null;
		store.employeeStore.employeeLogOut();

		await agent.Auth.logout();
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
			const response = await agent.Auth.updateStatus(userId);
			console.log(response);

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
			const response = await agent.Auth.updateDetails(user);
			console.log(response);

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
}
