import { Box, Fade, Modal, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface Props {
	open: boolean;
}

export default observer(function LeaveDayEdit({ open }: Props) {
	const handleClose = () => {
		open = false;
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Fade in={open}>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Text in a modal
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
				</Box>
			</Fade>
		</Modal>
	);
});
