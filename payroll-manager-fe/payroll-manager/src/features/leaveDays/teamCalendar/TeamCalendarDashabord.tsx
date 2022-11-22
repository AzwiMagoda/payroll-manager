import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
	getAllTeamMembers,
	getTeamBookedLeaveDays,
} from '../../../app/functions/employeeFunctions';
import { BookedLeaveDays } from '../../../app/models/bookedLeaveDays';
import { TeamMembers } from '../../../app/models/teamMembers';
import LeaveDaysCalendar from './LeaveDaysCalendar';
import TeamList from './TeamList';

interface Props {
	teamName: string;
}

export default observer(function TeamCalendarDashabord({ teamName }: Props) {
	const [bookedLeaveDays, setBookedLeaveDays] = useState<BookedLeaveDays[]>([]);
	const [teamMembers, setTeamMembers] = useState<
		{
			name: string;
			surname: string;
			color: string;
		}[]
	>([]);

	const colorList = ['#5048E5', '#10B981', '#FFB020', '#D14343'];
	useEffect(() => {
		initialise();
	}, []);

	const initialise = async () => {
		var teamDays = await getTeamBookedLeaveDays(teamName);
		var members = await getAllTeamMembers(teamName);

		if (teamDays) setBookedLeaveDays(teamDays);

		if (members) {
			const list = members.map((member) => ({
				name: member.firstName,
				surname: member.lastName,
				color: colorList[Math.floor(Math.random() * colorList.length)],
			}));
			setTeamMembers(list);
		}
	};
	return (
		<Grid container spacing={2}>
			<Grid item xs={6} md={3}>
				<TeamList teamList={teamMembers} />
			</Grid>
			<Grid item xs={6} md={9}>
				<LeaveDaysCalendar
					bookedLeaveDays={bookedLeaveDays}
					teamList={teamMembers}
				/>
			</Grid>
		</Grid>
	);
});
