import {
	CardContent,
	Grid,
	Stack,
	FormControl,
	TextField,
	Divider,
} from '@mui/material';
import React, { useState } from 'react';
import { UserDetails } from '../../../../app/models/userDetails';

interface Props {
	user: UserDetails;
}

export default function AdminEdit({ user }: Props) {
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [username, setUsername] = useState('');
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
					<FormControl fullWidth>
						<TextField
							margin='normal'
							id='email'
							label='Email Address'
							name='email'
							type='email'
							autoFocus
							value={email}
							onChange={(e: any) => setEmail(e.target.value)}
						/>
					</FormControl>
					<FormControl fullWidth>
						<TextField
							margin='normal'
							id='phoneNumber'
							label='Phone Number'
							name='phoneNumber'
							type='text'
							value={phoneNumber}
							onChange={(e: any) => setPhoneNumber(e.target.value)}
						/>
					</FormControl>
					<FormControl fullWidth>
						<TextField
							margin='normal'
							id='username'
							label='Username'
							name='username'
							type='text'
							value={username}
							onChange={(e: any) => setUsername(e.target.value)}
						/>
					</FormControl>
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
					justifyContent='space-evenly'
					alignItems='center'
				>
					<FormControl fullWidth>
						<TextField
							margin='normal'
							id='updated'
							name='updated'
							type='text'
							label='Date Updated'
							value={user.updatedDate}
							InputProps={{
								readOnly: true,
							}}
						/>
					</FormControl>
					<FormControl fullWidth>
						<TextField
							margin='normal'
							id='activated'
							name='activated'
							type='text'
							label='Date Activated'
							value={user.statusUpdateDate}
							InputProps={{
								readOnly: true,
							}}
						/>
					</FormControl>
				</Stack>
			</Grid>
		</Grid>
	);
}
