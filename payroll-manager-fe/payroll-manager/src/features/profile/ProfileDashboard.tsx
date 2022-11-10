import {
	Avatar,
	Box,
	Card,
	Grid,
	Paper,
	Stack,
	Tab,
	Tabs,
	Typography,
	Container,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../app/stores/store';
import ContactDetails from './ContactDetails';
import Dependants from './dependant/Dependants';
import PersonalInfo from './EmployeeDetails';
import ProfileDetails from './ProfileDetails';

export default observer(function ProfileDashboard() {
	const [activeMenu, setActiveMenu] = useState(0);
	const {
		employeeStore: { getAllDependants, currentEmployee },
	} = useStore();

	useEffect(() => {
		getAllDependants(currentEmployee!.id);
	});

	return (
		<Container>
			<Typography align='center' sx={{ mb: 3 }} variant='h4'>
				Your Profile
			</Typography>

			<Grid container spacing={3}>
				<Grid item lg={4} md={6} xs={12}>
					{currentEmployee && <ProfileDetails employee={currentEmployee} />}
				</Grid>
				<Grid item lg={8} md={6} xs={12}>
					<Tabs
						value={activeMenu}
						onChange={(event: any, value: any) => setActiveMenu(value)}
						aria-label='profile detail tabs'
					>
						<Tab label='Employee Details'></Tab>
						<Tab label='Contact Details'></Tab>
						<Tab label='Dependants'></Tab>
						<Tab label='Emergency Contact'></Tab>
					</Tabs>
					{activeMenu === 0 && <PersonalInfo />}
					{activeMenu === 1 && <ContactDetails />}
					{activeMenu === 2 && <Dependants />}
				</Grid>
			</Grid>
		</Container>
	);
});
