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

	const [employee, setEmployee] = useState<Employee>(initial);

	const {
		employeeStore: { updateEmployee },
	} = useStore();

	const onChange = (id: string, value: string) => {
		switch (id) {
			case 'firstName':
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
					<TextField
						margin='normal'
						id='firstName'
						label='First Name'
						name='firstName'
						type='text'
						autoFocus
						autoComplete='off'
						fullWidth
						value={employee.name}
						onChange={(
							e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
						) => onChange(e.target.id, e.target.value)}
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
				></Stack>
			</Grid>
		</Grid>
	);
});
