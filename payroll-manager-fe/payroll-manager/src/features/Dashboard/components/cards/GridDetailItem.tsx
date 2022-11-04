import { Grid, Typography } from '@mui/material';
import React from 'react';

interface Props {
	title: string;
	description: string;
}
export default function GridDetailItem({ title, description }: Props) {
	return (
		<>
			<Grid item xs={6} md={4}>
				<Typography variant='body2' sx={{ fontWeight: 600 }}>
					{title}
				</Typography>
			</Grid>
			<Grid item xs={6} md={8}>
				<Typography variant='body2'>{description}</Typography>
			</Grid>
		</>
	);
}
