import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Grid,
	InputAdornment,
	Paper,
	Stack,
	SvgIcon,
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
import SearchIcon from '@mui/icons-material/Search';
import LeaveRequests from './LeaveRequests';
import DoneIcon from '@mui/icons-material/Done';
import { GridSelectionModel } from '@mui/x-data-grid';

interface Props {
	employee: Employee;
	user: User;
}

export default observer(function LeaveDaysDashboard({ employee, user }: Props) {
	const [activeMenu, setActiveMenu] = useState(0);
	const [balanceDate, setBalanceDate] = useState(new Date());
	const [selectedIds, setSelectedIds] = React.useState<GridSelectionModel>([]);

	const {
		employeeStore: {
			leaveDays,
			bookedLeaveDays,
			getLeaveDaysBalances,
			getAllBookedLeaveDays,
			approveLeave,
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
	}, [getAllBookedLeaveDays]);

	useEffect(() => {
		console.log(selectedIds);
	}, [selectedIds]);

	const approveOnClick = async () => {
		await approveLeave(selectedIds.map(String));
	};

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
					{activeMenu === 2 && (
						<CardContent>
							<Stack
								direction='row'
								justifyContent='flex-end'
								alignItems='center'
								spacing={4}
							>
								<Button
									startIcon={<DoneIcon fontSize='small' />}
									sx={{ mr: 1 }}
									color='secondary'
									variant='contained'
									onClick={() => approveOnClick()}
								>
									Approve
								</Button>
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
				{activeMenu === 2 && <LeaveRequests setSelectedIds={setSelectedIds} />}
			</Box>
		</Container>
	);
});
