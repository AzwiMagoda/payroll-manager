import { Box, Grid, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';

export default function NotificationElement() {
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
								Leave Request
							</Typography>
							<Typography
								variant='subtitle1'
								color='textSecondary'
								align='right'
							>
								10:05AM
							</Typography>
						</Stack>
					</Grid>
					<Grid item sx={{ width: 'inherit' }}>
						<Typography variant='body2' color='textSecondary' noWrap={true}>
							Hulisani Nefolovhodwe has requested leave
						</Typography>
					</Grid>
				</Box>
			</Grid>
		</MenuItem>
	);
}
