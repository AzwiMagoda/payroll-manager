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
import { Employee } from '../../../../app/models/employee';
import GridDetailItem from './GridDetailItem';

interface Props {
	employee: Employee;
}

export default observer(function Details({ employee }: Props) {
	const details = [
		{ title: 'Employee Id', description: '308956' },
		{ title: 'Job Title', description: employee.jobTitle },
		{ title: 'Employee Type', description: employee.employeeType },
		{ title: 'Job Type', description: employee.jobType },
		{ title: 'Location', description: employee.location },
		{
			title: 'Hire Date',
			description: new Date(employee.hireDate!).toDateString(),
		},
		{
			title: 'Original Hire Date',
			description: new Date(employee.originalHireDate!).toDateString(),
		},
		{ title: 'Time in Position', description: '2 years' },
	];

	const contact = [
		{ title: 'Email', description: 'employee.email' },
		{ title: 'Cellphone', description: 'employee.cellphone' },
		{ title: 'Telephone', description: 'employee.telephone' },
		{ title: 'Work Address', description: 'employee.physicalAddress' },
	];

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
					{details.map((item, index) => (
						<GridDetailItem
							key={index}
							title={item.title}
							description={item.description!}
						/>
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
					{contact.map((item, index) => (
						<GridDetailItem
							key={index}
							title={item.title}
							description={item.description!}
						/>
					))}
				</Grid>
			</CardContent>
		</Card>
	);
});
