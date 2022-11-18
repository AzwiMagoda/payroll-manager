import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import EmployeeDashboard from '../../features/Dashboard/EmployeeDashboard';
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
import PayslipDashboard from '../../features/payslips/PayslipDashboard';
import RemunerationDashboard from '../../features/remuneration/RemunerationDashboard';
import HREmployeesDashboard from '../../features/HREmployees/HREmployeesDashboard';
import AdminDashboard from '../../features/admin/dashboard/AdminDashboard';
import UserDashboard from '../../features/admin/users/UserDashboard';
import EditUser from '../../features/admin/users/editUser/EditUser';

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
	const {
		authStore: { user, setUser, loading, setLoading },
		employeeStore: { currentEmployee, setCurrentEmployee },
		generalStore: {
			getDepartmentList,
			getTitleList,
			getManagerList,
			getTeamList,
			getEmployeeTypeList,
		},
	} = useStore();

	useEffect(() => {
		document.title = 'Home | PayME';
	}, []);

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

		if (user) {
			getTeamList();
			getTitleList();
			getDepartmentList();
			getManagerList();
			getEmployeeTypeList();
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

			{user && (
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
									py: 4,
								}}
							>
								<Routes>
									<>
										{user.role !== 'Admin' && currentEmployee ? (
											<>
												<Route
													path='/'
													element={
														<EmployeeDashboard employee={currentEmployee} />
													}
												/>
												<Route path='/account' element={<ProfileDashboard />} />

												<Route
													path='/leaveDashboard'
													element={
														<LeaveDaysDashboard
															employee={currentEmployee}
															user={user}
														/>
													}
												/>
												<Route
													path='/payslips'
													element={<PayslipDashboard />}
												/>
												<Route
													path='/remuneration'
													element={<RemunerationDashboard />}
												/>
												<Route path='/error404' element={<Error404 />} />
											</>
										) : (
											<Route path='/' element={<AdminDashboard />} />
										)}
										{(user.role === 'HR' || user.role === 'Admin') && (
											<>
												<Route
													path='/employees'
													element={<UserDashboard role={user.role} />}
												/>
												<Route
													path='/employee/:id'
													element={<EditUser role={user.role} />}
												/>
											</>
										)}
										<Route path='*' element={<Error404 />} />
									</>
								</Routes>
							</Box>
						</Box>
						<Navbar employee={currentEmployee} />
						<Sidebar employee={currentEmployee} user={user} />
					</DashboardLayoutRoot>
				</>
			)}
			{!user && !currentEmployee && <Login />}
		</>
	);
}

export default observer(App);
