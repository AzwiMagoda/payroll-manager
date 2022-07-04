import { useEffect, useState } from 'react';
import {
	Avatar,
	Button,
	Grid,
	Paper,
	Stack,
	Typography,
	Box,
	TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { observer } from 'mobx-react-lite';
import { Dependant } from '../../../app/models/dependant';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import LoadingButton from '@mui/lab/LoadingButton';
import DependantForm from './DependantForm';
import { useStore } from '../../../app/stores/store';
import formatISO from 'date-fns/formatISO';
interface Props {
	dependant: Dependant;
}

export default observer(function DependantCard({ dependant }: Props) {
	const {
		employeeStore: {
			removeNewDependantFromArray,
			setHasNewDependant,
			addNewDependant,
			newDependantId,
			updateDependant,
			deleteDependant,
			loading,
		},
	} = useStore();

	const [dob, setDob] = useState<Date | null>(new Date(dependant.dateOfBirth));
	const [name, setName] = useState(dependant.name);
	const [surname, setSurname] = useState(dependant.surname);
	const [idNumber, setIdNumber] = useState(dependant.idNumber);
	const [cellphone, setCellphone] = useState(dependant.cellphone);
	const [email, setEmail] = useState(dependant.email);
	const [editMode, setEditMode] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleDelete = async () => {
		if (dependant.name === '') {
			removeNewDependantFromArray();
			setHasNewDependant(false);
		} else {
			await deleteDependant(dependant.id);
		}
	};

	const handleSubmit = async () => {
		if (newDependantId === dependant.id) {
			await addNewDependant({
				id: dependant.id,
				employeeId: dependant.employeeId,
				cellphone: cellphone,
				dateOfBirth: formatISO(dob!),
				email: email,
				idNumber: idNumber,
				name: name,
				surname: surname,
				createdDate: null,
			});
			setEditMode(false);
		} else {
			await updateDependant({
				id: dependant.id,
				employeeId: dependant.employeeId,
				cellphone: cellphone,
				dateOfBirth: formatISO(dob!),
				email: email,
				idNumber: idNumber,
				name: name,
				surname: surname,
				createdDate: null,
			});
			setEditMode(false);
		}
	};

	useEffect(() => {
		if (name === '') {
			setErrorMessage('cannot be empty');
		}
	}, [name]);

	return (
		<Paper
			sx={{
				p: 2,
				margin: 'auto',
				maxWidth: 500,
				flexGrow: 1,
			}}
		>
			<Grid container spacing={2}>
				<Grid item>
					<Avatar sx={{ width: 128, height: 128 }}>
						<PersonIcon sx={{ width: 'inherit', height: 'inherit' }} />
					</Avatar>
				</Grid>
				<Grid item xs={12} sm container>
					<Grid item xs container direction='column' spacing={2}>
						<Grid item xs>
							{!editMode ? (
								<DependantForm dependant={dependant} />
							) : (
								<Box component='form' noValidate autoComplete='off'>
									<Stack
										direction='row'
										justifyContent='flex-start'
										alignItems='center'
										spacing={1}
									>
										<TextField
											variant='standard'
											margin='dense'
											id='name'
											label='Name'
											name='name'
											type='text'
											value={name}
											onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
												setName(event.target.value)
											}
										/>
										<TextField
											variant='standard'
											margin='dense'
											id='surname'
											label='Surname'
											name='surname'
											type='text'
											value={surname}
											onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
												setSurname(event.target.value)
											}
										/>
									</Stack>
									<DatePicker
										label='Date of Birth'
										value={dob}
										onChange={(newValue) => {
											setDob(newValue);
										}}
										renderInput={(params) => (
											<TextField
												fullWidth
												variant='standard'
												margin='dense'
												{...params}
											/>
										)}
									/>
									<TextField
										fullWidth
										variant='standard'
										margin='dense'
										id='idNumber'
										label='Id Number'
										name='idNumber'
										type='text'
										value={idNumber}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											setIdNumber(event.target.value)
										}
									/>

									<Stack
										direction='row'
										justifyContent='flex-start'
										alignItems='center'
										spacing={1}
										sx={{ marginBottom: '0.5rem' }}
									>
										<TextField
											variant='standard'
											margin='dense'
											id='cellphone'
											label='Cellphone No.'
											name='cellphone'
											type='text'
											value={cellphone}
											onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
												setCellphone(event.target.value)
											}
										/>
										<TextField
											variant='standard'
											margin='dense'
											id='email'
											label='Email Address'
											name='email'
											type='email'
											value={email}
											onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
												setEmail(event.target.value)
											}
										/>
									</Stack>
								</Box>
							)}
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Typography variant='subtitle1' component='div'>
						<Stack
							direction='column'
							justifyContent='flex-start'
							alignItems='flex-end'
							spacing={2}
						>
							{!editMode ? (
								<>
									<Button
										size='small'
										variant='text'
										startIcon={<EditIcon />}
										onClick={() => setEditMode(true)}
									/>
									<LoadingButton
										size='small'
										variant='text'
										startIcon={<DeleteIcon />}
										color='error'
										loading={loading}
										onClick={() => handleDelete()}
									/>
								</>
							) : (
								<>
									<LoadingButton
										size='small'
										variant='text'
										startIcon={<PublishIcon />}
										color='success'
										loading={loading}
										onClick={() => handleSubmit()}
									/>
									<Button
										size='small'
										variant='text'
										startIcon={<CancelIcon />}
										color='error'
										onClick={() => setEditMode(false)}
									/>
								</>
							)}
						</Stack>
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
});
