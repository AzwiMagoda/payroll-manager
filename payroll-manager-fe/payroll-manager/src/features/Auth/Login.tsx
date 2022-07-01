import React, { useState } from 'react';
import { useStore } from '../../app/stores/store';
import { Login as LoginDto } from '../../app/models/login';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default observer(function Login() {
	const {
		authStore: { login, user, loading },
		employeeStore: { currentEmployee },
	} = useStore();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		});
		await login(
			new LoginDto(data.get('email') as string, data.get('password') as string)
		);
	};

	return (
		<>
			{user && currentEmployee && <Navigate to='/dashboard' replace={true} />}
			<Container component='main' maxWidth='xs'>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					<Box
						component='form'
						onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
							handleSubmit(event)
						}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							type='email'
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
						/>
						<LoadingButton
							type='submit'
							fullWidth
							variant='contained'
							loading={loading}
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</LoadingButton>
						<Grid container>
							<Grid item xs>
								<Link href='#' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href='#' variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</>
	);
});
