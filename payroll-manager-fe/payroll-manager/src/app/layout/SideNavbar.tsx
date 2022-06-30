import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableViewIcon from '@mui/icons-material/TableView';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { Employee } from '../models/employee';
import { User } from '../models/user';
import { Avatar, Typography } from '@mui/material';

interface Props {
	employee: Employee;
	user: User;
	drawerWidth: number;
}

export default observer(function SideNavbar({
	employee,
	user,
	drawerWidth,
}: Props) {
	const {
		authStore: { logout },
	} = useStore();

	let navigate = useNavigate();

	const handleLogout = async () => {
		logout();
		navigate('/');
	};

	return (
		<Drawer
			variant='permanent'
			sx={{
				display: { xs: 'none', sm: 'block' },
				'& .MuiDrawer-paper': {
					boxSizing: 'border-box',
					width: drawerWidth,
				},
			}}
			open
		>
			<div>
				<Toolbar>
					<Avatar>{employee.name.charAt(0)}</Avatar>
					<Typography align='right' variant='h6'>
						{employee.name}
					</Typography>
				</Toolbar>
				<Divider />
				<List>
					<NavLink to='/'>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<DashboardIcon />
								</ListItemIcon>
								<ListItemText primary='Dashboard' />
							</ListItemButton>
						</ListItem>
					</NavLink>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<TableViewIcon />
							</ListItemIcon>
							<ListItemText primary='Employees' />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<AccountBoxIcon />
							</ListItemIcon>
							<ListItemText primary='Profile' />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />
				<List sx={{ position: 'fixed', bottom: '1%', width: drawerWidth }}>
					<Divider />
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary='Logout' />
						</ListItemButton>
					</ListItem>
				</List>
			</div>
		</Drawer>
	);
});
