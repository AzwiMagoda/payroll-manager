import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Employee } from '../models/employee';
import { User } from '../models/user';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/store';

const pages = ['Dashboard', 'Team', 'Payslips'];

interface Props {
	employee: Employee;
	user: User;
}

export default observer(function Header({ employee, user }: Props) {
	const {
		authStore: { logout },
	} = useStore();

	let navigate = useNavigate();

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = async () => {
		logout();
		navigate('/');
	};

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 500,
							letterSpacing: '.2rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						PayME
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							<MenuItem
								component={Link}
								to={'/'}
								onClick={handleCloseNavMenu}
								sx={{ letterSpacing: '.2rem' }}
							>
								<Typography textAlign='center'>Dashboard</Typography>
							</MenuItem>

							<MenuItem
								component={Link}
								to={'/team'}
								onClick={handleCloseNavMenu}
								sx={{ letterSpacing: '.2rem' }}
							>
								<Typography textAlign='center'>Team</Typography>
							</MenuItem>

							<MenuItem
								component={Link}
								to={'/payslips'}
								onClick={handleCloseNavMenu}
								sx={{ letterSpacing: '.2rem' }}
							>
								<Typography textAlign='center'>Payslips</Typography>
							</MenuItem>
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant='h5'
						noWrap
						component='a'
						href=''
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						PayME
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Button
							component={Link}
							to={'/'}
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							Dashboard
						</Button>

						<Button
							component={Link}
							to={'/team'}
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							Team
						</Button>

						<Button
							component={Link}
							to={'/payslips'}
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							Payslips
						</Button>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									alt={`${employee.name} ${employee.surname}`}
									src='/static/images/avatar/2.jpg'
								/>

								{/* <Typography>{employee.name}</Typography> */}
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem
								component={Link}
								to={`/profile`}
								onClick={handleCloseUserMenu}
							>
								<Typography textAlign='center'>Profile</Typography>
							</MenuItem>

							<MenuItem
								component={Link}
								to={`/leaveDashboard`}
								onClick={handleCloseUserMenu}
							>
								<Typography textAlign='center'>Leave Days</Typography>
							</MenuItem>

							<MenuItem
								component={Link}
								to={`/remuneration`}
								onClick={handleCloseUserMenu}
							>
								<Typography textAlign='center'>Remuneration</Typography>
							</MenuItem>

							<Divider />

							<MenuItem onClick={() => handleLogout()}>
								<Typography textAlign='center'>Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
});
