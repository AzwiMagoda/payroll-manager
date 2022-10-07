import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
	Backdrop,
	Box,
	CircularProgress,
	CssBaseline,
	Toolbar,
} from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import EmployeeDashboard from '../../features/Dashboard/EmployeeDashboard';
import SideNavbar from './SideNavbar';
import EmployeeList from '../../features/Dashboard/EmployeeList';
import Login from '../../features/Auth/Login';
import { useStore } from '../stores/store';
import ProfileDashboard from '../../features/profile/ProfileDashboard';
import './App.css';
import LeaveDaysDashboard from '../../features/leaveDays/LeaveDaysDashboard';
import { ToastContainer } from 'react-toastify';
import { User } from '../models/user';
import { Employee } from '../models/employee';
import HeaderNavigation from './HeaderNavigation';

function App() {
	const {
		authStore: { user, setUser, loading, setLoading },
		employeeStore: { currentEmployee, setCurrentEmployee },
	} = useStore();
	const drawerWidth = 240;

	useEffect(() => {
		if (user === null) {
			const userDetails = localStorage.getItem('user');
			if (userDetails) {
				const foundUser = JSON.parse(userDetails) as User;
				setUser(foundUser);

				const employee = localStorage.getItem('employeeDetails');

				if (employee) {
					const foundEmployee = JSON.parse(employee) as Employee;
					setCurrentEmployee(foundEmployee);
				}
			}
		}
	});

	return (
		<>
			<ToastContainer
				position='top-right'
				autoClose={3500}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			{/* <Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color='inherit' />
			</Backdrop> */}

			<Box sx={{ display: 'flex' }} style={{ minHeight: '100vh' }}>
				{/* <CssBaseline enableColorScheme /> */}

				{user && currentEmployee && (
					<>
						{/* <Box
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
						</Box> */}

						<Box
							component='main'
							sx={{
								flexGrow: 1,
								p: 3,
								width: { sm: `calc(100% - ${drawerWidth}px)` },
								padding: 0,
							}}
						>
							<HeaderNavigation employee={currentEmployee} user={user} />
							<Box sx={{ margin: '2rem' }}>
								<Routes>
									<Route
										path='/'
										element={<EmployeeDashboard employee={currentEmployee} />}
									/>
									<Route path='/profile' element={<ProfileDashboard />} />
									<Route
										path='/employees'
										element={<EmployeeList employees={[]} />}
									/>
									<Route
										path='leaveDashboard'
										element={<LeaveDaysDashboard />}
									/>
								</Routes>
							</Box>
						</Box>
					</>
				)}
				{!user && !currentEmployee && <Login />}
			</Box>
		</>
	);
}

export default observer(App);
