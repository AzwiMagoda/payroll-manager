import React from 'react';
import { Dashboard } from '@rsuite/icons';
import TableColumnIcon from '@rsuite/icons/TableColumn';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import CreativeIcon from '@rsuite/icons/Creative';
import ExitIcon from '@rsuite/icons/Exit';
import { Nav, Sidenav, Avatar } from 'rsuite';
import { NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';

export default function SideNavbar() {
	const navStyles = {
		height: '100%',
		boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
	};
	const headerStyles = {
		padding: 20,
		fontSize: 16,
	};

	const {
		authStore: { logout },
	} = useStore();

	return (
		<div style={{ width: 240, height: '100vh' }}>
			<Sidenav defaultOpenKeys={['4']} appearance='default' style={navStyles}>
				<Sidenav.Header style={headerStyles}>
					<Avatar circle style={{ background: '#000' }} size='lg'>
						R
					</Avatar>
					Ridzani
				</Sidenav.Header>
				<Sidenav.Body>
					<Nav activeKey='1'>
						<Nav.Item
							as={NavLink}
							to='/dashboard'
							eventKey='1'
							icon={<Dashboard />}
						>
							Dashboard
						</Nav.Item>
						<Nav.Item
							as={NavLink}
							to='/employees'
							eventKey='2'
							icon={<TableColumnIcon />}
						>
							Employees
						</Nav.Item>
						<Nav.Item eventKey='3' icon={<CreativeIcon />}>
							Career
						</Nav.Item>

						<Nav.Menu eventKey='4' title='My Profile' icon={<UserInfoIcon />}>
							<Nav.Item eventKey='4-1'>My Team</Nav.Item>
							<Nav.Item eventKey='4-2'>Vacation Days</Nav.Item>
							<Nav.Item eventKey='4-3'>Benefits</Nav.Item>
							<Nav.Menu eventKey='4-4' title='Payslips'>
								<Nav.Item eventKey='4-4-1'>View Payslips</Nav.Item>
								<Nav.Item eventKey='4-4-2'>Download Payslips</Nav.Item>
							</Nav.Menu>
						</Nav.Menu>

						<Nav.Item
							eventKey='5'
							icon={<ExitIcon />}
							style={{ position: 'fixed', bottom: '1%', width: 'inherit' }}
							onClick={logout}
						>
							Logout
						</Nav.Item>
					</Nav>
				</Sidenav.Body>
			</Sidenav>
		</div>
	);
}
