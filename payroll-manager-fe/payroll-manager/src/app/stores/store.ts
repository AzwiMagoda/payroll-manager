import { createContext, useContext } from 'react';
import EmployeeStore from './employeeStore';

interface Store {
	employeeStore: EmployeeStore;
}

export const store: Store = {
	employeeStore: new EmployeeStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
