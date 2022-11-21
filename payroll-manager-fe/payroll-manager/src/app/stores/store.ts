import { createContext, useContext } from 'react';
import AuthStore from './authStore';
import CommonStore from './commonStore';
import EmployeeProfileStore from './employeeProfileStore';
import EmployeeStore from './employeeStore';
import GeneralStore from './generalStore';
import ModalStore from './modalStore';
import PayslipStore from './payslipStore';
import RemunerationStore from './remunerationStore';
import TeamStore from './teamStore';

interface Store {
	employeeStore: EmployeeStore;
	authStore: AuthStore;
	commonStore: CommonStore;
	modalStore: ModalStore;
	teamStore: TeamStore;
	payslipStore: PayslipStore;
	remunerationStore: RemunerationStore;
	generalStore: GeneralStore;
	employeeProfileStore: EmployeeProfileStore;
}

export const store: Store = {
	employeeStore: new EmployeeStore(),
	authStore: new AuthStore(),
	commonStore: new CommonStore(),
	modalStore: new ModalStore(),
	teamStore: new TeamStore(),
	payslipStore: new PayslipStore(),
	remunerationStore: new RemunerationStore(),
	generalStore: new GeneralStore(),
	employeeProfileStore: new EmployeeProfileStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
