import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Payslip } from '../models/payslip';

export default class PayslipStore {
	loading = false;
	payslips = new Array<Payslip>();
	latestPayslip: Payslip | undefined = undefined;

	constructor() {
		makeAutoObservable(this);
	}

	getAllPayslips = async (employeeId: string) => {
		this.loading = true;
		try {
			const payslips = await agent.Payslips.getAllPayslips(employeeId);

			runInAction(() => {
				this.payslips = payslips;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	getlatestPayslip = async (employeeId: string) => {
		this.loading = true;
		try {
			const payslip = await agent.Payslips.getLatestPayslip(employeeId);

			runInAction(() => {
				this.latestPayslip = payslip;
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
