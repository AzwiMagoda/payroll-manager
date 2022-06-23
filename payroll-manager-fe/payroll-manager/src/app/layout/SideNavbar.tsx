import React from 'react';
import { Dashboard } from '@rsuite/icons';
import TableColumnIcon from '@rsuite/icons/TableColumn';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import CreativeIcon from '@rsuite/icons/Creative';
import ExitIcon from '@rsuite/icons/Exit';
import { Nav, Sidenav, Avatar } from 'rsuite';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { Employee } from '../models/employee';
import { headerStyles, navStyles } from './styles';
import { User } from '../models/user';

interface Props {
	employee: Employee;
	user: User;
}

export default observer(function SideNavbar({ employee, user }: Props) {
	const {
		authStore: { logout },
	} = useStore();

	let navigate = useNavigate();

	const handleLogout = async () => {
		logout();
		navigate('/');
	};

	return (
		<div style={{ width: 240, height: '100vh' }}>
			<Sidenav defaultOpenKeys={['4']} appearance='default' style={navStyles}>
				<Sidenav.Header style={headerStyles}>
					<Avatar circle style={{ background: '#000' }} size='lg'>
						{employee.name.charAt(0)}
					</Avatar>
					{employee.name}
				</Sidenav.Header>
				<Sidenav.Body>
					<Nav activeKey='1'>
						<Nav.Item as={NavLink} to='/' eventKey='1' icon={<Dashboard />}>
							Dashboard
						</Nav.Item>

						{user.role === 'hr' && (
							<Nav.Item
								as={NavLink}
								to='/employees'
								eventKey='2'
								icon={<TableColumnIcon />}
							>
								Employees
							</Nav.Item>
						)}

						<Nav.Menu eventKey='3' title='My Profile' icon={<UserInfoIcon />}>
							<Nav.Item eventKey='3-1'>My Team</Nav.Item>
							<Nav.Item eventKey='3-2'>Vacation Days</Nav.Item>
							<Nav.Item eventKey='3-3'>Benefits</Nav.Item>
							<Nav.Menu eventKey='3-4' title='Payslips'>
								<Nav.Item eventKey='3-4-1'>View Payslips</Nav.Item>
								<Nav.Item eventKey='3-4-2'>Download Payslips</Nav.Item>
							</Nav.Menu>
						</Nav.Menu>

						<Nav.Item
							eventKey='4'
							icon={<ExitIcon />}
							style={{ position: 'fixed', bottom: '1%', width: 'inherit' }}
							onClick={handleLogout}
						>
							Logout
						</Nav.Item>
					</Nav>
				</Sidenav.Body>
			</Sidenav>
		</div>
	);
});
