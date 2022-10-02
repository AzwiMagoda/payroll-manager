import { useState } from 'react';
import { Avatar, Button, Grid, Stack, TextField, Card } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { observer } from 'mobx-react-lite';
import { Dependant } from '../../../app/models/dependant';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import LoadingButton from '@mui/lab/LoadingButton';
import { useStore } from '../../../app/stores/store';
import formatISO from 'date-fns/formatISO';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DependantDetails from './DependantDetails';

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
	const [editMode, setEditMode] = useState(false);
	const [dob, setDob] = useState<Date | null>(new Date(dependant.dateOfBirth));

	const initialValues: Dependant = {
		cellphone: dependant.cellphone,
		dateOfBirth: dependant.dateOfBirth,
		email: dependant.email,
		idNumber: dependant.idNumber,
		name: dependant.name,
		surname: dependant.surname,
		createdDate: dependant.createdDate,
		employeeId: dependant.employeeId,
		id: dependant.id,
	};

	const validationSchema = yup.object({
		cellphone: yup.string().min(10, 'Please enter a valid cellphone number'),
		dateOfBirth: yup.string().required(),
		email: yup.string().email(),
		idNumber: yup.string().min(13, 'Please enter a valid ID number').required(),
		name: yup.string().required(),
		surname: yup.string().required(),
	});

	const handleDelete = async () => {
		if (dependant.name === '') {
			removeNewDependantFromArray();
			setHasNewDependant(false);
		} else {
			await deleteDependant(dependant.id);
		}
	};

	const handleSubmit = async (values: Dependant) => {
		values.dateOfBirth = formatISO(dob!);
		values.createdDate = null;
		if (newDependantId === dependant.id) {
			await addNewDependant(values);
			setEditMode(false);
		} else {
			await updateDependant(values);
			setEditMode(false);
		}
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Card sx={{ padding: '0 1rem' }}>
				<Grid
					container
					direction='row'
					justifyContent='space-evenly'
					alignItems='center'
				>
					<Grid item>
						<Avatar sx={{ width: 80, height: 80 }}>
							<PersonIcon sx={{ width: 'inherit', height: 'inherit' }} />
						</Avatar>
					</Grid>
					<Grid item>
						{!editMode ? (
							<DependantDetails dependant={dependant} />
						) : (
							<>
								<Stack
									direction='row'
									justifyContent='flex-start'
									alignItems='center'
									spacing={1}
								>
									<TextField
										id='name'
										fullWidth
										label='Name'
										type='text'
										value={formik.values.name}
										error={formik.touched.name && Boolean(formik.errors.name)}
										helperText={
											(formik.touched.name && formik.errors.name) ?? ' '
										}
										onChange={formik.handleChange}
										variant='standard'
									/>
									<TextField
										id='surname'
										fullWidth
										label='Surname'
										type='text'
										value={formik.values.surname}
										error={
											formik.touched.surname && Boolean(formik.errors.surname)
										}
										helperText={
											(formik.touched.surname && formik.errors.surname) ?? ' '
										}
										onChange={formik.handleChange}
										variant='standard'
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
									id='idNumber'
									label='Id Number'
									type='text'
									value={formik.values.idNumber}
									error={
										formik.touched.idNumber && Boolean(formik.errors.idNumber)
									}
									helperText={
										(formik.touched.idNumber && formik.errors.idNumber) ?? ' '
									}
									onChange={formik.handleChange}
									variant='standard'
									fullWidth
								/>
								<Stack
									direction='row'
									justifyContent='flex-start'
									alignItems='stretch'
									spacing={2}
								>
									<TextField
										fullWidth
										id='cellphone'
										label='Cell Number'
										type='text'
										value={formik.values.cellphone}
										error={
											formik.touched.cellphone &&
											Boolean(formik.errors.cellphone)
										}
										helperText={
											(formik.touched.cellphone && formik.errors.cellphone) ??
											' '
										}
										onChange={formik.handleChange}
										variant='standard'
									/>
									<TextField
										fullWidth
										id='email'
										label='Email'
										type='text'
										value={formik.values.email}
										error={formik.touched.email && Boolean(formik.errors.email)}
										helperText={
											(formik.touched.email && formik.errors.email) ?? ' '
										}
										onChange={formik.handleChange}
										variant='standard'
									/>
								</Stack>
							</>
						)}
					</Grid>
					<Grid item>
						<Stack
							direction='column'
							justifyContent='center'
							alignItems='center'
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
										type='submit'
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
					</Grid>
				</Grid>
			</Card>
		</form>
	);
});
