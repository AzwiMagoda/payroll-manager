import { Divider, Grid, Stack } from '@mui/material';
import React from 'react';

interface Props {
	leftComponents: JSX.Element[];
	rightComponents: JSX.Element[];
}

export default function FormBase({ leftComponents, rightComponents }: Props) {
	return (
		<Grid
			container
			direction='row'
			justifyContent='space-around'
			alignItems='center'
		>
			<Grid item xs={5}>
				<Stack
					direction='column'
					justifyContent='flex-start'
					alignItems='center'
				>
					{leftComponents.map((item, index) => {
						return item;
					})}
				</Stack>
			</Grid>

			<Divider
				sx={{
					borderColor: '#2D3748',
					mx: 3,
				}}
				orientation='vertical'
				variant='middle'
				flexItem
			/>

			<Grid item xs={5}>
				<Stack
					direction='column'
					justifyContent='flex-start'
					alignItems='center'
				>
					{rightComponents.map((item, index) => {
						return item;
					})}
				</Stack>
			</Grid>
		</Grid>
	);
}
