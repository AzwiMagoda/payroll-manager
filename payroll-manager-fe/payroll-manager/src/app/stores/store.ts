import { createContext, useContext } from 'react';
import AuthStore from './authStore';
import CommonStore from './commonStore';
import EmployeeStore from './employeeStore';
import ModalStore from './modalStore';

interface Store {
	employeeStore: EmployeeStore;
	authStore: AuthStore;
	commonStore: CommonStore;
	modalStore: ModalStore;
}

export const store: Store = {
	employeeStore: new EmployeeStore(),
	authStore: new AuthStore(),
	commonStore: new CommonStore(),
	modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
