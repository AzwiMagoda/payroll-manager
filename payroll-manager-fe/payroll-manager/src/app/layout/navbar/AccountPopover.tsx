import React from 'react';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';

interface Props {
	anchorEl?: HTMLButtonElement | null;
	open: boolean;
	onClose: any;
}

export default function AccountPopover({ anchorEl, open, onClose }: Props) {
	// const open = Boolean(anchorEl);

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
					John Doe
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
				<MenuItem>Sign out</MenuItem>
			</MenuList>
		</Popover>
	);
}
