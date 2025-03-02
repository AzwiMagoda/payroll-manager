import {
	Box,
	MenuItem,
	MenuList,
	Popover,
	Stack,
	Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { NotificationDto } from '../../models/notification';
import NotificationElement from './NotificationElement';

interface Props {
	anchorEl?: HTMLButtonElement | null;
	open: boolean;
	onClose: any;
	notifications: Array<NotificationDto>;
}

export default observer(function NotificationPopover({
	anchorEl,
	open,
	onClose,
	notifications,
}: Props) {
	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{
				horizontal: 'left',
				vertical: 'bottom',
			}}
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: { width: '350px' },
			}}
		>
			<Box
				sx={{
					py: 1.5,
					px: 2,
				}}
			>
				<Typography variant='overline'>Notifications</Typography>
			</Box>
			<MenuList
				disablePadding
				sx={{
					'& > *': {
						'&:first-of-type': {
							borderTopColor: 'divider',
							borderTopStyle: 'solid',
							borderTopWidth: '1px',
						},
						padding: '12px 16px',
					},
				}}
			>
				{notifications.slice(0, 3).map((notification) => (
					<NotificationElement
						notification={notification}
						key={notification.id}
					/>
				))}
			</MenuList>

			<Stack
				direction='row'
				justifyContent='flex-end'
				alignItems='center'
				spacing={2}
			>
				<MenuList disablePadding>
					<Link to='/notifications'>
						<MenuItem color='primary'>View All</MenuItem>
					</Link>
				</MenuList>
			</Stack>
		</Popover>
	);
});
