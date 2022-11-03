import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Employee } from '../../app/models/employee';
import * as material from '@mui/material';
import { useStore } from '../../app/stores/store';
import TeamList from './components/team/TeamList';
import LeaveDaysCard from './components/cards/LeaveDaysCard';
import ManagerCard from './components/cards/ManagerCard';
import PayslipCard from './components/cards/PayslipCard';
import PayslipList from './components/payslip/PayslipList';

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
		<material.Container maxWidth={false}>
			<material.Grid
				container
				spacing={3}
				justifyContent='space-evenly'
				alignItems='center'
			>
				{/* <Grid item lg={3} sm={6} xl={3} xs={12}>
					<UserDetails employee={employee} />
				</Grid> */}
				<material.Grid item lg={3} sm={6} xl={3} xs={12}>
					{leaveDays ? (
						<LeaveDaysCard leaveBalance={leaveDays.annualLeaveBalance} />
					) : (
						<material.Stack alignItems='center' spacing={5}>
							<material.CircularProgress />
						</material.Stack>
					)}
				</material.Grid>
				<material.Grid item lg={3} sm={6} xl={3} xs={12}>
					<ManagerCard managerName={employee.manager} />
				</material.Grid>
				<material.Grid item lg={3} sm={6} xl={3} xs={12}>
					{latestPayslip ? (
						<PayslipCard latestPayslip={latestPayslip} />
					) : (
						<material.Stack alignItems='center' spacing={5}>
							<material.CircularProgress />
						</material.Stack>
					)}
				</material.Grid>

				{/* Payslip */}
				<material.Grid item lg={4} md={6} xl={3} xs={12}>
					<PayslipList employeeId={employee.id} />
				</material.Grid>

				{/* Team list */}
				<material.Grid item lg={4} md={6} xl={3} xs={12}>
					<TeamList teamName={employee.teamName} />
				</material.Grid>
			</material.Grid>
		</material.Container>
	);
});
