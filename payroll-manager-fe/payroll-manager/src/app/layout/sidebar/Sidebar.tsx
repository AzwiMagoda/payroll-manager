import React from 'react';
import {
	Box,
	Button,
	Divider,
	Drawer,
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

const items = [
	{
		href: '/',
		icon: <DashboardIcon fontSize='small' />,
		title: 'Dashboard',
	},
	{
		href: '/employees',
		icon: <PeopleAltIcon fontSize='small' />,
		title: 'Employees',
	},
	{
		href: '/account',
		icon: <PersonIcon fontSize='small' />,
		title: 'Account',
	},
	{
		href: 'Compensation',
		icon: <PaidIcon fontSize='small' />,
		title: 'Compensation',
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
	// benefits
	//leave
	//contacts
	//performance
];

export default function Sidebar() {
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
					<Box sx={{ px: 2 }}></Box>
				</div>
				<Divider
					sx={{
						borderColor: '#2D3748',
						my: 3,
					}}
				/>
				<Box sx={{ flexGrow: 1 }}>
					{items.map((item) => (
						<NavItem
							key={item.title}
							icon={item.icon}
							href={item.href}
							title={item.title}
						/>
					))}
				</Box>
				<Divider sx={{ borderColor: '#2D3748' }} />
				<Box
					sx={{
						px: 2,
						py: 3,
					}}
				></Box>
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
}
