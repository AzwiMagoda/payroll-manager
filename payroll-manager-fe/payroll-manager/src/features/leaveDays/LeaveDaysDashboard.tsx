import { Box, Grid, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '../../app/stores/store';
import LeaveDaysBalances from './LeaveDaysBalances';
import LeaveDaysCalendar from './LeaveDaysCalendar';

export default observer(function LeaveDaysDashboard() {
	const {
		employeeStore: {
			leaveDays,
			bookedLeaveDays,
			getLeaveDaysBalances,
			getAllBookedLeaveDays,
			currentEmployee,
		},
	} = useStore();

	useEffect(() => {
		if (!leaveDays) {
			getLeaveDaysBalances(currentEmployee!.id);
		}
		if (!bookedLeaveDays) {
			getAllBookedLeaveDays(currentEmployee!.id);
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
