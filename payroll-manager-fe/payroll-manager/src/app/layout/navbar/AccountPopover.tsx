import React from 'react';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
	anchorEl?: HTMLButtonElement | null;
	open: boolean;
	onClose: any;
	employeeName: string;
}

export default observer(function AccountPopover({
	anchorEl,
	open,
	onClose,
	employeeName,
}: Props) {
	// const open = Boolean(anchorEl);
	const {
		authStore: { logout },
	} = useStore();

	const signOut = () => {
		logout();
	};

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
				sx: { width: '300px' },
			}}
			// {...other}
		>
			<Box
				sx={{
					py: 1.5,
					px: 2,
				}}
			>
				<Typography variant='overline'>Account</Typography>
				<Typography color='text.secondary' variant='body2'>
					{employeeName}
				</Typography>
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
				<MenuItem onClick={() => signOut()}>Sign out</MenuItem>
			</MenuList>
		</Popover>
	);
});
