import { makeAutoObservable, runInAction } from 'mobx';
import authAgent from '../api/authAgent';
import { Login } from '../models/login';
import { User } from '../models/user';
import { store } from './store';

export default class AuthStore {
	user: User | null = null;
	loading = false;
	loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	login = async (login: Login) => {
		try {
			if (!this.user) {
				const user = await authAgent.Auth.login(login);
				store.commonStore.setToken(user.token);
				await store.employeeStore.setCurrentEmployee(user.employeeId);
				runInAction(() => {
					this.user = user;
				});
				console.log(user);
			}
		} catch (error) {
			console.log(error);
		}
	};

	logout = () => {
		store.commonStore.setToken(null);
		window.localStorage.removeItem('jwt');
		this.user = null;
		store.employeeStore.employeeLogOut();
		console.log(this.user);
	};
}
