import React from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import EmployeeDashboard from '../../features/Dashboard/EmployeeDashboard';
import SideNavbar from './SideNavbar';
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
import HeaderNavigation from './HeaderNavigation';
import { Route, Routes } from 'react-router-dom';
import EmployeeList from '../../features/Dashboard/EmployeeList';
import Login from '../../features/Auth/Login';
import { useStore } from '../stores/store';
import ProfileDashboard from '../../features/profile/ProfileDashboard';

function App() {
	const {
		authStore: { user },
		employeeStore: { currentEmployee },
	} = useStore();

	return (
		<>
			<Container style={{ height: '100vh' }}>
				{!user && !currentEmployee && <Login />}
				{user && currentEmployee && (
					<>
						<Sidebar>
							<SideNavbar employee={currentEmployee} user={user} />
						</Sidebar>

						<Container>
							<Header style={{ margin: 0 }}>
								<HeaderNavigation />
							</Header>

							<Content>
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
							</Content>

							<Footer>Footer Here</Footer>
						</Container>
					</>
				)}
			</Container>
		</>
	);
}

export default observer(App);
