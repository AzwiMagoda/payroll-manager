import { createContext, useContext } from 'react';
import AuthStore from './authStore';
import CommonStore from './commonStore';
import EmployeeStore from './employeeStore';
import ModalStore from './modalStore';
import TeamStore from './teamStore';

interface Store {
	employeeStore: EmployeeStore;
	authStore: AuthStore;
	commonStore: CommonStore;
	modalStore: ModalStore;
	teamStore: TeamStore;
}

export const store: Store = {
	employeeStore: new EmployeeStore(),
	authStore: new AuthStore(),
	commonStore: new CommonStore(),
	modalStore: new ModalStore(),
	teamStore: new TeamStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
