import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Divider,
	FormControl,
	Grid,
	Stack,
	TextField,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { UserDetails } from '../../../app/models/userDetails';

export default observer(function EditUser() {
	let navigate = useNavigate();
	const { id } = useParams();
	const [user, setUser] = useState<UserDetails>();
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [username, setUsername] = useState('');

	const {
		authStore: { users, updateDetails, updateStatus, getUserList },
	} = useStore();

	useEffect(() => {
		var u = users.find((u) => u.id === id);
		if (u) {
			setUser(u);
			setEmail(u.email);
			setPhoneNumber(u.phoneNumber);
			setUsername(u.userName);
		}
	}, [user]);

	const onStatusClick = async () => {
		await updateStatus(id!);
		await getUserList();
	};

	const onSaveClick = async () => {
		// await updateDetails(id!);
		// await getUserList();
	};

	return (
		<Container maxWidth={false}>
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
							>
								<Button
									startIcon={<ArrowBackIosIcon fontSize='small' />}
									sx={{ mr: 1 }}
									onClick={(e: any) => navigate(-1)}
									// variant='contained'
								>
									Back
								</Button>
							</Stack>

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
									// variant='contained'
								>
									Save Changes
								</Button>
								<Button
									// startIcon={<ArrowBackIosIcon fontSize='small' />}
									sx={{ mr: 1 }}
									onClick={() => onStatusClick()}
									color='error'
									variant='contained'
								>
									Deactivate User
								</Button>
							</Stack>
						</Stack>
					</CardContent>
				</Card>
			</Box>

			<Box sx={{ mt: 3 }}>
				<Card>
					{user && (
						<CardContent>
							<Grid
								container
								direction='row'
								justifyContent='center'
								alignItems='center'
							>
								<Grid item xs={4}>
									<Stack
										direction='column'
										justifyContent='space-evenly'
										alignItems='center'
									>
										<FormControl>
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
										<FormControl>
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
										<FormControl>
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
								<Divider orientation='vertical' variant='middle' flexItem />
								<Grid item xs={4}>
									<Stack
										direction='column'
										justifyContent='space-evenly'
										alignItems='center'
									>
										<FormControl>
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
										<FormControl>
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
						</CardContent>
					)}
				</Card>
			</Box>
		</Container>
	);
});
