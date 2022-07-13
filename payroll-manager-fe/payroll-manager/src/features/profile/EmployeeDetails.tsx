import {
	Button,
	FormControl,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	Stack,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import CancelIcon from '@mui/icons-material/Cancel';
import { useStore } from '../../app/stores/store';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextFieldInput from '../../app/common/form/TextFieldInput';
import { PersonalInfoForm } from '../../app/models/personalInfoForm';

export default observer(function PersonalInfo() {
	const {
		employeeStore: { currentEmployee, updatePersonalInfo, loading },
	} = useStore();

	const [editMode, setEditMode] = useState(false);
	const [readOnly, setReadOnly] = useState(true);

	const initialValues: PersonalInfoForm = {
		department: currentEmployee!.department ?? '',
		email: currentEmployee!.email ?? '',
		jobTitle: currentEmployee!.jobTitle ?? '',
		name: currentEmployee!.name ?? '',
		surname: currentEmployee!.surname ?? '',
		title: currentEmployee!.title ?? '',
	};

	const validationSchema = yup.object({
		name: yup.string().required('Required'),
		surname: yup.string().required('Required'),
		title: yup.string().required('Required'),
	});

	const handleEdit = () => {
		setEditMode(true);
		setReadOnly(false);
	};

	const handleCancel = (e: any) => {
		setEditMode(false);
		setReadOnly(true);
		formik.handleReset(e);
	};

	const handleSubmit = async (values: PersonalInfoForm) => {
		await updatePersonalInfo(values);
		setEditMode(false);
		setReadOnly(true);
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
			<Stack
				direction='row'
				justifyContent='center'
				alignItems='center'
				spacing={4}
			>
				{readOnly ? (
					<TextFieldInput
						id='title'
						label='Title'
						inputProps={{
							readOnly: readOnly,
						}}
						type='text'
						error={formik.touched.title && Boolean(formik.errors.title)}
						helperText={(formik.touched.title && formik.errors.title) ?? ' '}
						value={formik.values.title}
						onChange={formik.handleChange}
					/>
				) : (
					<FormControl variant='standard' fullWidth>
						<InputLabel id='titleLabel'>Title</InputLabel>
						<Select
							labelId='titleLabel'
							id='title'
							name='title'
							value={formik.values.title}
							label='Title'
							onChange={formik.handleChange}
						>
							<MenuItem value={'Mr'}>Mr</MenuItem>
							<MenuItem value={'Mrs'}>Mrs</MenuItem>
							<MenuItem value={'Miss'}>Miss</MenuItem>
							<MenuItem value={'Dr'}>Dr</MenuItem>
							<MenuItem value={'Prof'}>Prof</MenuItem>
						</Select>
					</FormControl>
				)}
				<TextFieldInput
					id='name'
					label='Name'
					inputProps={{
						readOnly: readOnly,
					}}
					type='text'
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={(formik.touched.name && formik.errors.name) ?? ' '}
					value={formik.values.name}
					onChange={formik.handleChange}
				/>
				<TextFieldInput
					id='surname'
					label='Surname'
					inputProps={{
						readOnly: readOnly,
					}}
					type='text'
					error={formik.touched.surname && Boolean(formik.errors.surname)}
					helperText={(formik.touched.surname && formik.errors.surname) ?? ' '}
					value={formik.values.surname}
					onChange={formik.handleChange}
				/>
			</Stack>
			<Stack
				direction='row'
				justifyContent='center'
				alignItems='center'
				spacing={4}
			>
				<TextFieldInput
					id='jobTitle'
					label='Job Title'
					inputProps={{
						readOnly: readOnly,
						disabled: editMode,
					}}
					type='text'
					value={formik.values.jobTitle}
				/>
				<TextFieldInput
					id='department'
					label='Department'
					inputProps={{
						readOnly: readOnly,
						disabled: editMode,
					}}
					type='text'
					value={formik.values.department}
				/>
			</Stack>

			<FormControl fullWidth>
				<TextFieldInput
					id='email'
					label='Email'
					inputProps={{
						readOnly: readOnly,
						disabled: editMode,
					}}
					type='text'
					value={formik.values.email}
				/>
			</FormControl>

			<FormGroup>
				{!editMode ? (
					<Stack
						direction='row'
						justifyContent='center'
						alignItems='center'
						spacing={4}
					>
						<Button
							variant='contained'
							startIcon={<EditIcon />}
							onClick={() => handleEdit()}
							size='large'
						>
							Edit
						</Button>
					</Stack>
				) : (
					<Stack
						direction='row'
						justifyContent='center'
						alignItems='center'
						spacing={4}
					>
						<LoadingButton
							color='success'
							variant='contained'
							startIcon={<PublishIcon />}
							loading={loading}
							loadingPosition='start'
							size='large'
							type='submit'
						>
							Submit
						</LoadingButton>
						<Button
							color='error'
							variant='contained'
							startIcon={<CancelIcon />}
							onClick={(e: any) => handleCancel(e)}
							size='large'
						>
							Cancel
						</Button>
					</Stack>
				)}
			</FormGroup>
		</form>
	);
});
