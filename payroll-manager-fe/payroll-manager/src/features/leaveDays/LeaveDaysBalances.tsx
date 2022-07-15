import { Box, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../app/stores/store';

export default observer(function LeaveDaysBalances() {
	const {
		employeeStore: { leaveDays },
	} = useStore();

	return (
		<Box>
			{leaveDays && (
				<Stack
					direction='column'
					justifyContent='center'
					alignItems='flex-start'
					spacing={3}
				>
					<Typography variant='h5'>Leave Balances</Typography>
					<Stack
						direction='column'
						justifyContent='center'
						alignItems='flex-start'
						spacing={0}
					>
						<Typography variant='subtitle1'>Annual Leave</Typography>
						<Typography variant='body2'>
							{leaveDays!.annualLeaveBalance}
						</Typography>
					</Stack>

					<Stack
						direction='column'
						justifyContent='center'
						alignItems='flex-start'
						spacing={0}
					>
						<Typography variant='subtitle1'>Sick Leave</Typography>
						<Typography variant='body2'>
							{leaveDays!.sickLeaveBalance}
						</Typography>
					</Stack>

					<Stack
						direction='column'
						justifyContent='center'
						alignItems='flex-start'
						spacing={0}
					>
						<Typography variant='subtitle1'>Study Leave</Typography>
						<Typography variant='body2'>
							{leaveDays!.studyLeaveBalance}
						</Typography>
					</Stack>
				</Stack>
			)}
		</Box>
	);
});
