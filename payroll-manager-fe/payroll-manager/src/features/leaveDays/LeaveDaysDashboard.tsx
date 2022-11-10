import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
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
import LeaveRequests from './LeaveRequests';
import DoneIcon from '@mui/icons-material/Done';
import { GridSelectionModel } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import BookLeave from './BookLeave';

interface Props {
	employee: Employee;
	user: User;
}

export default observer(function LeaveDaysDashboard({ employee, user }: Props) {
	const [activeMenu, setActiveMenu] = useState(0);
	const [balanceDate, setBalanceDate] = useState(new Date());
	const [selectedIds, setSelectedIds] = React.useState<GridSelectionModel>([]);
	const [showBookLeaveForm, setShowBookLeaveForm] = React.useState(false);

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

	const onBookLeaveClick = () => {
		setShowBookLeaveForm(!showBookLeaveForm);
	};

	return (
		<Container maxWidth={false}>
			<Tabs
				value={activeMenu}
				onChange={(event: any, value: any) => setActiveMenu(value)}
				aria-label='profile detail tabs'
			>
				<Tab label='Leave Balance'></Tab>
				<Tab label='Booked Leave'></Tab>
				<Tab label='Team Calendar'></Tab>
				{user.role === 'Manager' && <Tab label='Leave Requests'></Tab>}
			</Tabs>

			<Box sx={{ mt: 3 }}>
				<Card>
					{activeMenu === 0 && (
						<CardContent>
							<Stack
								direction='row'
								justifyContent='space-between'
								alignItems='center'
								spacing={2}
							>
								{!showBookLeaveForm ? (
									<Button
										startIcon={<AddIcon fontSize='small' />}
										sx={{ mr: 1 }}
										color='success'
										variant='contained'
										onClick={() => onBookLeaveClick()}
									>
										Book Leave
									</Button>
								) : (
									<Button
										startIcon={<CancelIcon fontSize='small' />}
										sx={{ mr: 1 }}
										color='error'
										variant='contained'
										onClick={() => onBookLeaveClick()}
									>
										Cancel
									</Button>
								)}
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
							</Stack>
						</CardContent>
					)}
					{activeMenu === 3 && (
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
					<>
						{showBookLeaveForm ? (
							<BookLeave />
						) : (
							<LeaveDaysBalances leaveDays={leaveDays} />
						)}
					</>
				)}
				{activeMenu === 2 && (
					<LeaveDaysCalendar bookedLeaveDays={bookedLeaveDays} />
				)}
				{activeMenu === 3 && <LeaveRequests setSelectedIds={setSelectedIds} />}
			</Box>
		</Container>
	);
});
