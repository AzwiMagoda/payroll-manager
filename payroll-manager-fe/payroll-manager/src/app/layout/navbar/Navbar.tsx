import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	IconButton,
	Toolbar,
	Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import AccountPopover from './AccountPopover';
import { Employee } from '../../models/employee';
import NotificationPopover from './NotificationPopover';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import LogoutIcon from '@mui/icons-material/Logout';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
	backgroundColor: '#FFFFFF',
	boxShadow: '0px 1px 4px rgba(100, 116, 139, 0.12)',
}));

interface Props {
	employee: Employee | undefined;
}

export default observer(function Navbar({ employee }: Props) {
	const settingsRef = useRef(null);
	const [openAccountPopover, setOpenAccountPopover] = useState(false);
	const [openNotifications, setOpenNotifications] = useState(false);

	const {
		employeeStore: { notifications, getNotifications },
		authStore: { logout },
	} = useStore();

	useEffect(() => {
		if (employee) {
			getNotifications(employee.id);
		}
	}, []);

	const signOut = async () => {
		await logout();
	};

	return (
		<>
			<DashboardNavbarRoot
				sx={{
					left: {
						lg: 280,
					},
					width: {
						lg: 'calc(100% - 280px)',
					},
				}}
			>
				<Toolbar
					disableGutters
					sx={{
						minHeight: 64,
						left: 0,
						px: 2,
					}}
				>
					{employee ? (
						<>
							<IconButton
								// onClick={onSidebarOpen}
								sx={{
									display: {
										xs: 'inline-flex',
										lg: 'none',
									},
								}}
							>
								<MenuIcon fontSize='small' />
							</IconButton>
							<Tooltip title='Search'>
								<IconButton sx={{ ml: 1 }}>
									<SearchIcon fontSize='small' />
								</IconButton>
							</Tooltip>
							<Box sx={{ flexGrow: 1 }} />
							<Tooltip title='Notifications'>
								<IconButton
									sx={{ ml: 1 }}
									onClick={() => setOpenNotifications(true)}
									ref={settingsRef}
								>
									<Badge badgeContent={4} color='primary' variant='dot'>
										<NotificationsIcon fontSize='small' />
									</Badge>
								</IconButton>
							</Tooltip>
							<Avatar
								onClick={() => setOpenAccountPopover(true)}
								ref={settingsRef}
								sx={{
									cursor: 'pointer',
									height: 40,
									width: 40,
									ml: 1,
								}}
								src='/static/images/avatars/avatar_1.png'
							>
								<AccountCircleIcon sx={{ fontSize: 40, bgcolor: '#4B5563' }} />
							</Avatar>
						</>
					) : (
						<Tooltip title='Logout'>
							<IconButton
								sx={{ ml: 1 }}
								onClick={() => signOut()}
								ref={settingsRef}
							>
								<LogoutIcon fontSize='small' />
								Logout
							</IconButton>
						</Tooltip>
					)}
				</Toolbar>
			</DashboardNavbarRoot>
			{employee && (
				<>
					<AccountPopover
						anchorEl={settingsRef.current}
						open={openAccountPopover}
						onClose={() => setOpenAccountPopover(false)}
						employeeName={`${employee.name} ${employee.surname}`}
					/>
					<NotificationPopover
						anchorEl={settingsRef.current}
						open={openNotifications}
						onClose={() => setOpenNotifications(false)}
						notifications={notifications}
					/>
				</>
			)}
		</>
	);
});
