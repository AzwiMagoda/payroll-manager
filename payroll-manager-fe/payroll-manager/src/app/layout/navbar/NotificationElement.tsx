import { Box, Grid, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { NotificationDto } from '../../models/notification';

interface Props {
	notification: NotificationDto;
}

export default function NotificationElement({ notification }: Props) {
	return (
		<MenuItem>
			<Grid container direction='column'>
				<Box whiteSpace={'normal'} sx={{ width: 'inherit' }}>
					<Grid item>
						<Stack
							direction='row'
							justifyContent='space-between'
							alignItems='center'
							spacing={4}
						>
							<Typography variant='body2' color='textSecondary'>
								{notification.notificationType}
							</Typography>
							<Typography
								variant='subtitle1'
								color='textSecondary'
								align='right'
							>
								{notification.createdDate.toString()}
							</Typography>
						</Stack>
					</Grid>
					<Grid item sx={{ width: 'inherit' }}>
						<Typography variant='body2' color='textSecondary' noWrap={true}>
							{notification.message}
						</Typography>
					</Grid>
				</Box>
			</Grid>
		</MenuItem>
	);
}
