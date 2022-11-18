import {
	Grid,
	Stack,
	TextField,
	Divider,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { RegisterDto } from '../../../../app/models/register';

interface Props {
	setUser: (params: any) => any;
	firstName: string;
	lastName: string;
	setFirstName: (params: any) => any;
	setLastName: (params: any) => any;
}

export default observer(function UserForm({
	setUser,
	firstName,
	lastName,
	setFirstName,
	setLastName,
}: Props) {
	let user: RegisterDto = {
		firstName: '',
		lastName: '',
		phoneNumber: '',
		role: '',
	};
	const roles = ['Employee', 'HR', 'Manager'];
	const [role, setRole] = useState(0);
	const [phoneNumber, setPhoneNumber] = useState('');

	const textFields = [
		{
			id: 'firstName',
			value: firstName,
			label: 'First Name',
			onChange: setFirstName,
		},
		{
			id: 'lastName',
			value: lastName,
			label: 'Last Name',
			onChange: setLastName,
		},
		{
			id: 'phoneNumber',
			value: phoneNumber,
			label: 'Phone Number',
			onChange: setPhoneNumber,
		},
	];

	useEffect(() => {
		user.firstName = firstName;
		user.lastName = lastName;
		user.phoneNumber = phoneNumber;
		user.role = roles[role];

		setUser(user);
	}, [firstName, lastName, phoneNumber, role]);

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
							key={index}
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
							) => item.onChange(e.target.value)}
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
				>
					<FormControl fullWidth margin='normal'>
						<InputLabel id='lblRole'>Role</InputLabel>
						<Select
							labelId='lblRole'
							id='role'
							value={role}
							label='Role'
							onChange={(e) => setRole(e.target.value as number)}
						>
							{roles.map((role, i) => (
								<MenuItem key={i} value={i}>
									{role}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>
			</Grid>
		</Grid>
	);
});
