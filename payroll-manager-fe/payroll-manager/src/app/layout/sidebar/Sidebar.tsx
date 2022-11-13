import React, { useEffect } from 'react';
import {
	Avatar,
	Box,
	Divider,
	Drawer,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PaidIcon from '@mui/icons-material/Paid';
import NavItem from './NavItem';
import { Employee } from '../../models/employee';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import { observer } from 'mobx-react-lite';
import { User } from '../../models/user';

const items = [
	{
		href: '/',
		icon: <DashboardIcon fontSize='small' />,
		title: 'Dashboard',
	},

	{
		href: '/leaveDashboard',
		icon: <HouseboatIcon fontSize='small' />,
		title: 'Leave',
	},
	{
		href: '/account',
		icon: <PersonIcon fontSize='small' />,
		title: 'Account',
	},
	{
		href: '/remuneration',
		icon: <PaidIcon fontSize='small' />,
		title: 'Remuneration',
	},
	{
		href: '/team',
		icon: <GroupsIcon fontSize='small' />,
		title: 'Team',
	},
	{
		href: '/payslips',
		icon: <PictureAsPdfIcon fontSize='small' />,
		title: 'Payslips',
	},
	//contacts
	//performance
];

interface Props {
	employee: Employee;
	user: User;
}

export default observer(function Sidebar({ employee, user }: Props) {
	useEffect(() => {
		if (user.role === 'HR' || (user.role === 'Manager' && items.length < 6)) {
			items.push({
				href: '/employees',
				icon: <PeopleAltIcon fontSize='small' />,
				title: 'Employees',
			});
		}
	}, []);

	const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'), {
		defaultMatches: true,
		noSsr: false,
	});

	const content = (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
				}}
			>
				<div>
					<Box sx={{ p: 3 }}></Box>
					<Box sx={{ px: 2 }}>
						<Stack
							direction='column'
							justifyContent='space-around'
							alignItems='center'
							spacing={3}
						>
							<Avatar
								alt={`${employee.name} ${employee.surname}`}
								src='/static/images/avatar/1.jpg'
								sx={{
									height: '8em',
									mb: 2,
									width: '8em',
								}}
							>
								<AccountCircleIcon
									sx={{ fontSize: '10em', bgcolor: '#4B5563' }}
								/>
							</Avatar>

							<Box
								sx={{
									alignItems: 'center',
									backgroundColor: 'rgba(255, 255, 255, 0.04)',
									display: 'flex',
									justifyContent: 'space-between',
									px: 3,
									py: '11px',
									borderRadius: 1,
								}}
							>
								<div>
									<Typography color='inherit' variant='subtitle1'>
										{employee.name} {employee.surname}
									</Typography>
									<Typography color='neutral.400' variant='body2'>
										{employee.jobTitle}
									</Typography>
								</div>
							</Box>
						</Stack>
					</Box>
				</div>
				<Divider
					sx={{
						borderColor: '#2D3748',
						my: 3,
					}}
				/>
				<Box sx={{ flexGrow: 1 }}>
					{items.map((item, i) => (
						<>
							<NavItem
								key={i}
								icon={item.icon}
								href={item.href}
								title={item.title}
							/>
						</>
					))}
				</Box>
			</Box>
		</>
	);

	if (lgUp) {
		return (
			<Drawer
				anchor='left'
				open
				PaperProps={{
					sx: {
						backgroundColor: 'neutral.900',
						color: '#FFFFFF',
						width: 280,
					},
				}}
				variant='permanent'
			>
				{content}
			</Drawer>
		);
	}

	return (
		<Drawer
			anchor='left'
			// onClose={onClose}
			// open
			PaperProps={{
				sx: {
					backgroundColor: 'neutral.900',
					color: '#FFFFFF',
					width: 280,
				},
			}}
			sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
			variant='temporary'
		>
			{content}
		</Drawer>
	);
});
