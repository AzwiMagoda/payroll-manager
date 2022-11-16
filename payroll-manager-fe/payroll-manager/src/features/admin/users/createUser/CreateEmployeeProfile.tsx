import {
	Divider,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { CreateEmployee } from '../../../../app/models/createEmployee';

interface Props {
	setEmployee: (params: any) => any;
	firstName: string;
	lastName: string;
}

export default observer(function CreateEmployeeProfile({
	setEmployee,
	firstName,
	lastName,
}: Props) {
	const departments = ['HR', 'Technology', 'Finance'];
	const titles = ['Mr', 'Miss', 'Mrs', 'Dr', 'Prof'];

	const [jobTitle, setJobTitle] = useState('');
	const [department, setDepartment] = useState(0);
	const [title, setTitle] = useState(0);

	useEffect(() => {
		var employee = new CreateEmployee(
			titles[title],
			firstName,
			lastName,
			departments[department],
			jobTitle
		);

		setEmployee(employee);
	}, [jobTitle, firstName, lastName, department, title]);

	return (
		<Grid
			container
			direction='row'
			justifyContent='space-around'
			alignItems='center'
		>
			<Grid item xs={4}>
				<Stack
					direction='column'
					justifyContent='flex-start'
					alignItems='center'
				>
					<TextField
						margin='normal'
						id='firstName'
						label='First Name'
						name='firstName'
						type='text'
						autoFocus
						autoComplete='off'
						fullWidth
						value={firstName}
						InputProps={{
							readOnly: true,
						}}
					/>
					<TextField
						margin='normal'
						id='lastName'
						label='Last Name'
						name='lastName'
						type='text'
						fullWidth
						autoComplete='off'
						value={lastName}
						InputProps={{
							readOnly: true,
						}}
					/>
					<TextField
						margin='normal'
						id='jobTitle'
						label='Job Title'
						name='jobTitle'
						type='text'
						fullWidth
						autoComplete='off'
						value={jobTitle}
						onChange={(e: any) => setJobTitle(e.target.value)}
					/>
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

			<Grid item xs={4}>
				<Stack
					direction='column'
					justifyContent='flex-start'
					alignItems='center'
				>
					<FormControl fullWidth margin='normal'>
						<InputLabel id='lblDepartment'>Department</InputLabel>
						<Select
							labelId='lblDepartment'
							id='department'
							value={department}
							label='Department'
							onChange={(e) => setDepartment(e.target.value as number)}
						>
							{departments.map((d, i) => (
								<MenuItem key={i} value={i}>
									{d}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth margin='normal'>
						<InputLabel id='lblTitle'>Title</InputLabel>
						<Select
							labelId='lblTitle'
							id='title'
							value={title}
							label='Title'
							onChange={(e) => setTitle(e.target.value as number)}
						>
							{titles.map((t, i) => (
								<MenuItem key={i} value={i}>
									{t}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>
			</Grid>
		</Grid>
	);
});
