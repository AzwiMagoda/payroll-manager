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
import { useStore } from '../../../../app/stores/store';
import SaveIcon from '@mui/icons-material/Save';
import { RegisterDto } from '../../../../app/models/register';
import UserForm from './UserForm';
import { CreateEmployee } from '../../../../app/models/createEmployee';
import CreateEmployeeProfile from './CreateEmployeeProfile';

export default function CreateUser() {
	const title = 'Create User';

	const steps = ['Create User Profile', 'Initialise Employee Profile'];
	const [activeStep, setActiveStep] = React.useState(0);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const [user, setUser] = useState<RegisterDto>();
	const [employee, setEmployee] = useState<CreateEmployee>();

	const {
		authStore: { createUser },
		employeeStore: { createEmployee },
	} = useStore();

	useEffect(() => {
		document.title = `${title} | PayME`;
	}, []);

	const onSaveClick = async () => {
		if (user) {
			var response = await createUser(user);

			if (response) {
				if (employee) {
					await createEmployee(employee, response);
				}
			}
			console.log(response);
		}
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
							{steps.map((label, index) => (
								<Step key={index}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
					</CardContent>

					<CardContent>
						{activeStep == 0 && (
							<UserForm
								setUser={setUser}
								firstName={firstName}
								lastName={lastName}
								setFirstName={setFirstName}
								setLastName={setLastName}
							/>
						)}
						{activeStep == 1 && (
							<CreateEmployeeProfile
								setEmployee={setEmployee}
								firstName={firstName}
								lastName={lastName}
							/>
						)}
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
