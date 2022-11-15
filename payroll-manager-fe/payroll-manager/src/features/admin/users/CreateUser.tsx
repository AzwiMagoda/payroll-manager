import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import SaveIcon from '@mui/icons-material/Save';
import { RegisterDto } from '../../../app/models/register';

export default function CreateUser() {
	const title = 'Create User';

	const steps = ['Create User Profile', 'Initialise Employee Profile'];
	const roles = ['Employee', 'HR', 'Manager'];
	const [activeStep, setActiveStep] = React.useState(0);
	const [role, setRole] = useState(0);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');

	const {
		authStore: { createUser },
	} = useStore();

	useEffect(() => {
		document.title = `${title} | PayME`;
	}, []);

	const onSaveClick = async () => {
		var user = new RegisterDto(
			password,
			firstName,
			lastName,
			phoneNumber,
			roles[role]
		);

		console.log(user);
		var response = await createUser(user);

		console.log(response);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<>
			<Box sx={{ mt: 3 }}>
				<Card>
					<CardContent>
						<Stack
							direction='row'
							justifyContent='space-between'
							alignItems='center'
							spacing={2}
						>
							<Stack
								direction='row'
								justifyContent='flex-start'
								alignItems='center'
								spacing={2}
							></Stack>
							<Typography
								color='text.secondary'
								variant='h5'
								sx={{ textTransform: 'uppercase' }}
								align='center'
							>
								{title}
							</Typography>
							<Stack
								direction='row'
								justifyContent='flex-end'
								alignItems='center'
								spacing={4}
							>
								<Button
									startIcon={<SaveIcon fontSize='small' />}
									sx={{ mr: 1 }}
									onClick={() => onSaveClick()}
									color='info'
									variant='contained'
								>
									Create User
								</Button>
							</Stack>
						</Stack>
					</CardContent>
				</Card>
			</Box>

			<Box sx={{ mt: 3 }}>
				<Card>
					<CardContent>
						<Stepper activeStep={activeStep}>
							{steps.map((label, index) => {
								return (
									<Step key={index}>
										<StepLabel>{label}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
					</CardContent>
					<CardContent>
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
					</CardContent>

					<CardContent>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Button
								color='inherit'
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Back
							</Button>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</>
	);
}
