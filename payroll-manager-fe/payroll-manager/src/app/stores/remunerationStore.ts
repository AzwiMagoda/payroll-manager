import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Remuneration } from '../models/remuneration';

export default class RemunerationStore {
	remuneration: Remuneration | undefined = undefined;
	loading = false;

	constructor() {
		makeAutoObservable(this);
	}

	getRemuneration = async () => {
		this.loading = true;

		try {
			const remuneration = await agent.Remunerations.getRemuneration();

			runInAction(() => {
				this.loading = false;
				this.remuneration = remuneration;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};
}
