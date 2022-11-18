import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { ListDto } from '../models/listDto';

export default class GeneralStore {
	teamList = new Array<ListDto>();
	managerList = new Array<ListDto>();
	departmentList = new Array<ListDto>();
	titleList = new Array<string>();
	employeeTypeList = new Array<string>();

	constructor() {
		makeAutoObservable(this);
	}

	getTeamList = async () => {
		try {
			const list = await agent.General.getTeamList();

			runInAction(() => {
				this.teamList = list;
			});
		} catch (error) {
			console.log(error);
		}
	};

	getTeamListDepartment = async (department: string) => {
		try {
			const list = await agent.General.getTeamListDepartment(department);

			return list;
		} catch (error) {
			console.log(error);
		}
	};

	getManagerList = async () => {
		try {
			const list = await agent.General.getManagerList();

			runInAction(() => {
				this.managerList = list;
			});
		} catch (error) {
			console.log(error);
		}
	};

	getDepartmentList = async () => {
		try {
			const list = await agent.General.getDepartmentList();

			runInAction(() => {
				this.departmentList = list;
			});
		} catch (error) {
			console.log(error);
		}
	};

	getTitleList = async () => {
		try {
			const list = await agent.General.getTitle();

			runInAction(() => {
				this.titleList = list;
			});
		} catch (error) {
			console.log(error);
		}
	};

	getEmployeeTypeList = async () => {
		try {
			const list = await agent.General.getEmployeeTypeList();

			runInAction(() => {
				this.employeeTypeList = list;
			});
		} catch (error) {
			console.log(error);
		}
	};
}
