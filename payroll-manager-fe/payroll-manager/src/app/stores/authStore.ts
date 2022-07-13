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
		this.loading = true;
		try {
			if (!this.user) {
				const user = await authAgent.Auth.login(login);
				store.commonStore.setToken(user.token);
				await store.employeeStore.setCurrentEmployee(user.employeeId);
				runInAction(() => {
					this.user = user;
					this.loading = false;
				});
			}
		} catch (error) {
			console.log(error);
			this.loading = false;
		}
	};

	logout = () => {
		store.commonStore.setToken(null);
		window.localStorage.removeItem('jwt');
		this.user = null;
		store.employeeStore.employeeLogOut();
	};
}
