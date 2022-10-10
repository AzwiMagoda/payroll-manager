import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Employee } from '../../app/models/employee';
import { Link, NavLink } from 'react-router-dom';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Typography,
	CircularProgress,
	Stack,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useStore } from '../../app/stores/store';
import TeamList from './components/team/TeamList';
import LeaveDaysCard from './components/cards/LeaveDaysCard';
import ManagerCard from './components/cards/ManagerCard';
import PayslipCard from './components/cards/PayslipCard';
import PayslipList from './components/payslip/PayslipList';
import UserDetails from './components/userDetails/UserDetails';

interface Props {
	employee: Employee;
}

export default observer(function EmployeeDashboard({ employee }: Props) {
	const {
		employeeStore: {
			leaveDays,
			getAllBookedLeaveDays,
			getLeaveDaysBalances,
			loading,
		},
		payslipStore: { getlatestPayslip, latestPayslip, payslips },
	} = useStore();

	useEffect(() => {
		getLeaveDaysBalances(employee.id);
		getAllBookedLeaveDays(employee.id);
		getlatestPayslip(employee.id);
	}, [employee.id, getAllBookedLeaveDays, getLeaveDaysBalances, getlatestPayslip]);

	return (
		<Container maxWidth={false}>
			<Grid
				container
				spacing={3}
				justifyContent='space-evenly'
				alignItems='center'
			>
				{/* <Grid item lg={3} sm={6} xl={3} xs={12}>
					<UserDetails employee={employee} />
				</Grid> */}
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					{leaveDays ? (
						<LeaveDaysCard leaveBalance={leaveDays.annualLeaveBalance} />
					) : (
						<Stack alignItems='center' spacing={5}>
							<CircularProgress />
						</Stack>
					)}
				</Grid>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					<ManagerCard managerName={employee.manager} />
				</Grid>
				<Grid item lg={3} sm={6} xl={3} xs={12}>
					{latestPayslip ? (
						<PayslipCard latestPayslip={latestPayslip} />
					) : (
						<Stack alignItems='center' spacing={5}>
							<CircularProgress />
						</Stack>
					)}
				</Grid>

				{/* Payslip */}
				<Grid item lg={4} md={6} xl={3} xs={12}>
					<PayslipList employeeId={employee.id} />
				</Grid>

				{/* Team list */}
				<Grid item lg={4} md={6} xl={3} xs={12}>
					<TeamList teamName={employee.teamName} />
				</Grid>
			</Grid>
		</Container>
	);
});
