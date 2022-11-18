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
	Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../../../app/stores/store';
import { UserDetails } from '../../../../app/models/userDetails';
import AdminEdit from './AdminEdit';
import HrEdit from './HrEdit';
import { Employee } from '../../../../app/models/employee';
import {
	getEmployee,
	getContactDetails,
} from '../../../../app/functions/employeeFunctions';

interface Props {
	role: string;
}

export default observer(function EditUser({ role }: Props) {
	let navigate = useNavigate();
	const { id } = useParams();
	const [user, setUser] = useState<UserDetails>();
	const [employee, setEmployee] = useState<Employee>();

	const title = 'Edit User';

	const {
		authStore: { users, updateStatus, getUserList },
	} = useStore();

	useEffect(() => {
		document.title = `${title} | PayME`;
	}, []);

	useEffect(() => {
		var u = users.find((u) => u.id === id);
		if (u) {
			setUser(u);
		}
		initialise();
	}, [user]);

	const initialise = async () => {
		if (user) {
			var e = await getEmployee(user.id);
			if (e) setEmployee(e);
			getContactDetails(user.id);
		}
	};

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
			{user && (
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
											// variant='contained'
										>
											Save Changes
										</Button>
										{role === 'Admin' && (
											<Button
												sx={{ mr: 1 }}
												onClick={() => onStatusClick()}
												color={user.isActive ? 'error' : 'success'}
												variant='contained'
											>
												{user.isActive ? 'Deactivate' : 'Activate'} User
											</Button>
										)}
									</Stack>
								</Stack>
							</CardContent>
						</Card>
					</Box>

					<Box sx={{ mt: 3 }}>
						<Card>
							<CardContent>
								{user && (
									<>
										{role === 'Admin' && <AdminEdit user={user} />}
										{role === 'HR' && employee && (
											<HrEdit employee={employee} />
										)}
									</>
								)}
							</CardContent>
						</Card>
					</Box>
				</>
			)}
		</Container>
	);
});
