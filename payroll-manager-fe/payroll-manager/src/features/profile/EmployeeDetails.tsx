import {
	Box,
	Button,
	Container,
	FormControl,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import CancelIcon from '@mui/icons-material/Cancel';
import { PersonalInfoForm } from '../../app/models/personalInfoForm';
import { useStore } from '../../app/stores/store';

export default observer(function PersonalInfo() {
	const {
		employeeStore: { currentEmployee, updatePersonalInfo, loading },
	} = useStore();

	const initialValues: PersonalInfoForm = {
		department: currentEmployee!.department ?? '',
		email: currentEmployee!.email ?? '',
		jobTitle: currentEmployee!.jobTitle ?? '',
		name: currentEmployee!.name ?? '',
		surname: currentEmployee!.surname ?? '',
		title: currentEmployee!.title ?? '',
	};

	const [formValue, setFormValue] = useState<any>(initialValues);
	const [editMode, setEditMode] = useState(false);
	const [readOnly, setReadOnly] = useState(true);
	const [title, setTitle] = useState(currentEmployee!.title);

	const handleEdit = () => {
		setEditMode(true);
		setReadOnly(false);
	};

	const handleCancel = () => {
		setFormValue(initialValues);
		setEditMode(false);
		setReadOnly(true);
	};

	const handleSubmit = async () => {
		await updatePersonalInfo(formValue);
		setEditMode(false);
		setReadOnly(true);
	};

	return (
		<Box
			component='form'
			noValidate
			autoComplete='off'
			sx={{
				marginTop: '2rem',
			}}
		>
			<Stack
				direction='row'
				justifyContent='center'
				alignItems='center'
				spacing={4}
			>
				<FormControl fullWidth>
					{readOnly ? (
						<TextField
							margin='normal'
							fullWidth
							id='title'
							label='Title'
							name='title'
							type='text'
							InputProps={{
								readOnly: readOnly,
							}}
							defaultValue={currentEmployee!.title}
						/>
					) : (
						<>
							<InputLabel id='titleLabel'>Title</InputLabel>

							<Select
								labelId='titleLabel'
								id='title'
								value={title}
								label='Title'
								onChange={(event: SelectChangeEvent) =>
									setTitle(event.target.value as string)
								}
							>
								<MenuItem value={'Mr'}>Mr</MenuItem>
								<MenuItem value={'Mrs'}>Mrs</MenuItem>
								<MenuItem value={'Miss'}>Miss</MenuItem>
								<MenuItem value={'Dr'}>Dr</MenuItem>
								<MenuItem value={'Prof'}>Prof</MenuItem>
							</Select>
						</>
					)}
				</FormControl>
				<TextField
					margin='normal'
					fullWidth
					id='name'
					label='Name'
					name='name'
					type='text'
					InputProps={{
						readOnly: readOnly,
					}}
					defaultValue={currentEmployee!.name}
				/>
				<TextField
					margin='normal'
					fullWidth
					id='surname'
					label='Surname'
					name='surname'
					type='text'
					InputProps={{
						readOnly: readOnly,
					}}
					defaultValue={currentEmployee!.surname}
				/>
			</Stack>
			<FormControl fullWidth>
				<TextField
					margin='normal'
					fullWidth
					id='jobTitle'
					label='Job Title'
					name='jobTitle'
					type='text'
					InputProps={{
						readOnly: readOnly,
						disabled: editMode,
					}}
					defaultValue={currentEmployee!.jobTitle}
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					margin='normal'
					fullWidth
					id='department'
					label='Department'
					name='department'
					type='text'
					InputProps={{
						readOnly: readOnly,
						disabled: editMode,
					}}
					defaultValue={currentEmployee!.department}
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					margin='normal'
					fullWidth
					id='email'
					label='Work Email'
					name='email'
					type='text'
					InputProps={{
						readOnly: readOnly,
						disabled: editMode,
					}}
					defaultValue={currentEmployee!.email}
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
							onClick={() => handleSubmit()}
							loading={loading}
						>
							Submit
						</LoadingButton>
						<Button
							color='error'
							variant='contained'
							startIcon={<CancelIcon />}
							onClick={() => handleCancel()}
						>
							Cancel
						</Button>
					</Stack>
				)}
			</FormGroup>
		</Box>
	);
});
