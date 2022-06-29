import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import EmployeeDashboard from '../../features/Dashboard/EmployeeDashboard';
import SideNavbar from './SideNavbar';
import EmployeeList from '../../features/Dashboard/EmployeeList';
import Login from '../../features/Auth/Login';
import { useStore } from '../stores/store';
import ProfileDashboard from '../../features/profile/ProfileDashboard';
import './App.css';

function App() {
	const {
		authStore: { user },
		employeeStore: { currentEmployee },
	} = useStore();
	const drawerWidth = 240;

	return (
		<Box sx={{ display: 'flex' }} style={{ minHeight: '100vh' }}>
			<CssBaseline enableColorScheme />
			{!user && !currentEmployee && <Login />}
			{user && currentEmployee && (
				<>
					<Box
						component='nav'
						sx={{
							width: { sm: drawerWidth },
							flexShrink: { sm: 0 },
							margin: 0,
						}}
						aria-label='side navbar'
					>
						<SideNavbar
							employee={currentEmployee}
							user={user}
							drawerWidth={drawerWidth}
						/>
					</Box>

					<Box
						component='main'
						sx={{
							flexGrow: 1,
							p: 3,
							width: { sm: `calc(100% - ${drawerWidth}px)` },
							padding: 0,
						}}
					>
						<Toolbar>PayMe</Toolbar>
						<Routes>
							<Route
								path='/'
								element={<EmployeeDashboard employee={currentEmployee} />}
							/>
							<Route path='/profile' element={<ProfileDashboard />}></Route>
							<Route
								path='/employees'
								element={<EmployeeList employees={[]} />}
							/>
						</Routes>
					</Box>
				</>
			)}
		</Box>
	);
}

export default observer(App);
