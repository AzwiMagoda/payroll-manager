import { Box, Grid, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import LeaveDaysBalances from './LeaveDaysBalances';
import LeaveDaysCalendar from './LeaveDaysCalendar';

export default observer(function LeaveDaysDashboard() {
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
					<Paper>
						<LeaveDaysCalendar />
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
});
