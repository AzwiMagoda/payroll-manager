import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Grid,
	Stack,
	Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
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

const contact = [
	{ title: 'Email', description: 'hulisani@42.com' },
	{ title: 'Cellphone', description: '076 898 7799' },
	{ title: 'Telephone', description: '011 987 9696' },
	{ title: 'Work Address', description: '3 Mulberry Lane, Bryanston' },
];

export default observer(function Details() {
	return (
		<Card>
			<CardHeader title='Job Details' />
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
					{contact.map((item) => (
						<GridDetailItem title={item.title} description={item.description} />
					))}
				</Grid>
			</CardContent>
		</Card>
	);
});
