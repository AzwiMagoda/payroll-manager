import React from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import EmployeeDashboard from '../../features/Dashboard/EmployeeDashboard';
import SideNavbar from './SideNavbar';
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
import HeaderNavigation from './HeaderNavigation';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import EmployeeList from '../../features/Dashboard/EmployeeList';
import Login from '../../features/Auth/Login';

function App() {
	return (
		<>
			<Container style={{ height: '100vh' }}>
				<Sidebar>
					<SideNavbar />
				</Sidebar>

				<Container>
					<Header style={{ margin: 0 }}>
						<HeaderNavigation />
					</Header>

					<Content>
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/' element={<HomePage />} />
							<Route path='/dashboard' element={<EmployeeDashboard />} />
							<Route
								path='/employees'
								element={<EmployeeList employees={[]} />}
							/>
						</Routes>
					</Content>

					<Footer>Footer Here</Footer>
				</Container>
			</Container>
		</>
	);
}

export default observer(App);
