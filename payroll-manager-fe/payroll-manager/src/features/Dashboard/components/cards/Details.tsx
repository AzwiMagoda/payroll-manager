import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Grid,
	Stack,
	Typography,
} from '@mui/material';
import React from 'react';
import GridDetailItem from './GridDetailItem';

const details = [
	{ title: 'Employee Id', description: '308956' },
	{ title: 'Job Title', description: 'Splunk Engineer' },
	{ title: 'Employee Type', description: 'Regular' },
	{ title: 'Job Type', description: 'Full Time' },
	{ title: 'Location', description: 'Johannesburg' },
	{ title: 'Hire Date', description: '01/11/2020' },
	{ title: 'Original Hire Date', description: '01/11/2018' },
	{ title: 'Time in Position', description: '2 years' },
];

const contact = [{ title: 'Employee Id', description: '308956' }];

export default function Details() {
	return (
		<Card>
			<CardHeader title='Details' />
			<CardContent>
				<Grid
					container
					direction='row'
					justifyContent='space-around'
					alignItems='flex-start'
				>
					{details.map((item) => (
						<GridDetailItem title={item.title} description={item.description} />
					))}
				</Grid>
			</CardContent>
			<CardHeader title='Contact Details' />
			<CardContent>
				<Grid
					container
					direction='row'
					justifyContent='space-around'
					alignItems='flex-start'
				>
					{details.map((item) => (
						<GridDetailItem title={item.title} description={item.description} />
					))}
				</Grid>
			</CardContent>
		</Card>
	);
}
