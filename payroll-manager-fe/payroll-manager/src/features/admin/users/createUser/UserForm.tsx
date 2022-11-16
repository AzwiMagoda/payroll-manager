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
	const roles = ['Employee', 'HR', 'Manager'];

	const [role, setRole] = useState(0);
	const [phoneNumber, setPhoneNumber] = useState('');

	const [password, setPassword] = useState('');

	useEffect(() => {
		var user = new RegisterDto(
			password,
			firstName,
			lastName,
			phoneNumber,
			roles[role]
		);

		setUser(user);
	}, [password, firstName, lastName, phoneNumber, role]);

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
						onChange={(e: any) => setFirstName(e.target.value)}
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
						onChange={(e: any) => setLastName(e.target.value)}
					/>
					<TextField
						margin='normal'
						id='phoneNumber'
						label='Phone Number'
						name='phoneNumber'
						type='text'
						fullWidth
						autoComplete='off'
						value={phoneNumber}
						onChange={(e: any) => setPhoneNumber(e.target.value)}
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
					<TextField
						margin='normal'
						id='password'
						label='Password'
						name='password'
						type='password'
						fullWidth
						inputProps={{ autoComplete: 'off' }}
						value={password}
						onChange={(e: any) => setPassword(e.target.value)}
					/>
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
