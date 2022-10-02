import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { TeamMembers } from '../models/teamMembers';

export default class TeamStore {
	loading = false;
	teamMembers = new Array<TeamMembers>();

	constructor() {
		makeAutoObservable(this);
	}

	getAllTeamMembers = async (teamName: string) => {
		this.loading = true;
		try {
			const teamMembers = await agent.Team.getAllTeamMembers(teamName);

			runInAction(() => {
				this.teamMembers = teamMembers;
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
