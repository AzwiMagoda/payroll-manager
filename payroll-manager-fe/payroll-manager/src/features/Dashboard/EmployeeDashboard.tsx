import { observer } from 'mobx-react-lite';
import { Employee } from '../../app/models/employee';
import { Container, Grid } from '@mui/material';
import LeaveDaysCard from './components/cards/LeaveDaysCard';
import Details from './components/cards/Details';
import ManagerDetails from './components/cards/ManagerTeamDetails';

interface Props {
	employee: Employee;
}

export default observer(function EmployeeDashboard({ employee }: Props) {
	return (
		<Container maxWidth={false}>
			<Grid container spacing={3}>
				<Grid item lg={8} md={12} xl={9} xs={12}>
					<ManagerDetails employee={employee} />
				</Grid>
				<Grid item lg={4} md={6} xl={3} xs={12}>
					<LeaveDaysCard leaveBalance={0} />
				</Grid>
				<Grid item lg={8} md={12} xl={9} xs={12}>
					<Details employee={employee} />
				</Grid>
			</Grid>
		</Container>
	);
});
