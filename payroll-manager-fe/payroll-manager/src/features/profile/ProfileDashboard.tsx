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
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import ContactDetails from './ContactDetails';
import Dependants from './Dependants';
import PersonalInfo from './EmployeeDetails';

export default observer(function ProfileDashboard() {
	const [activeMenu, setActiveMenu] = useState(0);

	return (
		<Box>
			<Typography align='center' variant='h4' sx={{ marginBottom: '2rem' }}>
				Your Profile
			</Typography>

			<Box sx={{ padding: '2rem 5rem' }}>
				<Grid
					container
					direction='row'
					justifyContent='space-evenly'
					alignItems='stretch'
					spacing={12}
				>
					<Grid item xs>
						<Paper elevation={0}>
							<Avatar
								sx={{
									width: '5rem',
									height: '5rem',
								}}
							>
								H
							</Avatar>
						</Paper>
					</Grid>
					<Grid item xs={8}>
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
			</Box>
		</Box>
	);
});
