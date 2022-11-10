import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import EmployeeDashboard from '../../features/Dashboard/EmployeeDashboard';
import EmployeeList from '../../features/Dashboard/EmployeeList';
import Login from '../../features/Auth/Login';
import { useStore } from '../stores/store';
import ProfileDashboard from '../../features/profile/ProfileDashboard';
import './App.css';
import LeaveDaysDashboard from '../../features/leaveDays/LeaveDaysDashboard';
import { ToastContainer } from 'react-toastify';
import { User } from '../models/user';
import { Employee } from '../models/employee';
import Error404 from '../common/error/Error404';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
	display: 'flex',
	flex: '1 1 auto',
	maxWidth: '100%',
	paddingTop: 64,
	[theme.breakpoints.up('lg')]: {
		paddingLeft: 280,
	},
}));

function App() {
	useEffect(() => {
		document.title = 'Home | PayME';
	}, []);

	const {
		authStore: { user, setUser, loading, setLoading },
		employeeStore: { currentEmployee, setCurrentEmployee },
	} = useStore();

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

			{user && currentEmployee && (
				<>
					<DashboardLayoutRoot>
						<Box
							sx={{
								display: 'flex',
								flex: '1 1 auto',
								flexDirection: 'column',
								width: '100%',
							}}
						>
							<Box
								component='main'
								sx={{
									flexGrow: 1,
									py: 8,
								}}
							>
								<Routes>
									<Route
										path='/'
										element={<EmployeeDashboard employee={currentEmployee} />}
									/>
									<Route path='/account' element={<ProfileDashboard />} />
									<Route
										path='/employees'
										element={<EmployeeList employees={[]} />}
									/>
									<Route
										path='/leaveDashboard'
										element={
											<LeaveDaysDashboard
												employee={currentEmployee}
												user={user}
											/>
										}
									/>
									<Route path='/error404' element={<Error404 />} />
								</Routes>
							</Box>
						</Box>
						<Navbar employee={currentEmployee} />
						<Sidebar employee={currentEmployee} />
					</DashboardLayoutRoot>
				</>
			)}
			{!user && !currentEmployee && <Login />}
		</>
	);
}

export default observer(App);
