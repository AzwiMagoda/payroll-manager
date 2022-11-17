import { Divider, Grid, Stack, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Employee } from '../../../../../app/models/employee';
import { UserDetails } from '../../../../../app/models/userDetails';
import { useStore } from '../../../../../app/stores/store';

interface Props {
	user: UserDetails;
}

export default observer(function EmployeeProfileForm({ user }: Props) {
	let initial: Employee = {
		name: user.firstName,
		surname: user.lastName,
		cellphone: user.phoneNumber,
	};

	const departments = ['HR', 'Technology', 'Finance'];
	const titles = ['Mr', 'Miss', 'Mrs', 'Dr', 'Prof'];

	const [employee, setEmployee] = useState<Employee>(initial);

	const textFields = [
		{
			id: 'name',
			value: employee.name,
			label: 'First Name',
		},
		{
			id: 'surname',
			value: employee.surname,
			label: 'Last Name',
		},
		{
			id: 'jobTitle',
			value: employee.jobTitle,
			label: 'Job Title',
		},
	];

	const {
		employeeStore: { updateEmployee },
	} = useStore();

	const onChange = (id: string, value: string) => {
		switch (id) {
			case 'name':
				initial.name = value;
				break;
		}

		setEmployee(initial);
	};

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
					{textFields.map((item, index) => (
						<TextField
							margin='normal'
							id={item.id}
							label={item.label}
							name={item.id}
							type='text'
							autoFocus
							autoComplete='off'
							fullWidth
							value={item.value}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
							) => onChange(e.target.id, e.target.value)}
						/>
					))}
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
				></Stack>
			</Grid>
		</Grid>
	);
});
