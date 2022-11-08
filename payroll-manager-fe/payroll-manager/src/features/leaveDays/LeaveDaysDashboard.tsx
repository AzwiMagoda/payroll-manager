import { Box, Grid, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Employee } from '../../app/models/employee';
import { useStore } from '../../app/stores/store';
import LeaveDaysBalances from './LeaveDaysBalances';
import LeaveDaysCalendar from './LeaveDaysCalendar';

interface Props {
	employee: Employee;
}

export default observer(function LeaveDaysDashboard({ employee }: Props) {
	const {
		employeeStore: {
			leaveDays,
			bookedLeaveDays,
			getLeaveDaysBalances,
			getAllBookedLeaveDays,
		},
	} = useStore();

	useEffect(() => {
		if (!leaveDays) {
			getLeaveDaysBalances(employee.id);
		}
		if (!bookedLeaveDays) {
			getAllBookedLeaveDays(employee.id);
		}
	});

	return (
		<Box>
			<Grid
				container
				direction='row'
				justifyContent='space-evenly'
				alignItems='flex-start'
				spacing={10}
			>
				<Grid item xs={3}>
					<Paper sx={{ padding: '2rem' }}>
						<LeaveDaysBalances />
					</Paper>
				</Grid>
				<Grid item xs>
					<Box>
						<LeaveDaysCalendar />
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
});
