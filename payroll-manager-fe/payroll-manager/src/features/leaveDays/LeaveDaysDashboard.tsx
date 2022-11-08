import {
	Box,
	Card,
	CardContent,
	Container,
	Grid,
	Paper,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Employee } from '../../app/models/employee';
import { User } from '../../app/models/user';
import { useStore } from '../../app/stores/store';
import LeaveDaysBalances from './LeaveDaysBalances';
import LeaveDaysCalendar from './LeaveDaysCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Props {
	employee: Employee;
	user: User;
}

export default observer(function LeaveDaysDashboard({ employee, user }: Props) {
	const {
		employeeStore: {
			leaveDays,
			bookedLeaveDays,
			getLeaveDaysBalances,
			getAllBookedLeaveDays,
		},
	} = useStore();

	useEffect(() => {
		document.title = 'Leave | PayME';
	}, []);

	useEffect(() => {
		if (!leaveDays) {
			getLeaveDaysBalances(employee.id);
		}

		getAllBookedLeaveDays(employee.id);
	});

	const [activeMenu, setActiveMenu] = useState(0);
	const [balanceDate, setBalanceDate] = useState(new Date());

	return (
		<Container maxWidth={false}>
			<Tabs
				value={activeMenu}
				onChange={(event: any, value: any) => setActiveMenu(value)}
				aria-label='profile detail tabs'
			>
				<Tab label='Leave Balance'></Tab>
				<Tab label='Book Leave'></Tab>
				{user.role === 'Manager' && <Tab label='Leave Requests'></Tab>}
			</Tabs>

			<Box sx={{ mt: 3 }}>
				<Card>
					{activeMenu === 0 && (
						<CardContent>
							<Stack
								direction='row'
								justifyContent='flex-end'
								alignItems='center'
								spacing={4}
							>
								<Typography variant='body2'>Leave balance as at: </Typography>
								<DatePicker
									// label='Balance'
									value={balanceDate}
									onChange={(newValue) => {
										if (newValue !== null) setBalanceDate(newValue);
									}}
									renderInput={(params) => (
										<TextField variant='outlined' {...params} />
									)}
								/>
							</Stack>
						</CardContent>
					)}
				</Card>
			</Box>

			<Box sx={{ mt: 3 }}>
				{activeMenu === 0 && leaveDays && (
					<LeaveDaysBalances leaveDays={leaveDays} />
				)}
				{activeMenu === 1 && (
					<LeaveDaysCalendar bookedLeaveDays={bookedLeaveDays} />
				)}
			</Box>
		</Container>
	);
});
