import { EventApi } from '@fullcalendar/react';
import {
	Box,
	Button,
	Fade,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../app/stores/store';
import formatISO from 'date-fns/formatISO';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BookedLeaveDays } from '../../app/models/bookedLeaveDays';
import { LoadingButton } from '@mui/lab';
import PublishIcon from '@mui/icons-material/Publish';
import { addDays } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

interface Props {
	leaveEvent: EventApi;
}

export default observer(function LeaveDayEdit({ leaveEvent }: Props) {
	const {
		modalStore: { open, closeModal },
		employeeStore: { loading, updateLeave, deleteLeave },
	} = useStore();

	const [start, setStart] = useState<Date | null>(leaveEvent.start);
	const [end, setEnd] = useState<Date | null>(addDays(leaveEvent.end!, -1));

	const initialValues: BookedLeaveDays = {
		endDate: end!.toISOString(),
		id: leaveEvent.id,
		leaveType: leaveEvent.title,
		startDate: start!.toISOString(),
	};

	const handleSubmit = async (values: BookedLeaveDays) => {
		console.log(end);
		values.endDate = end!.toISOString();
		values.startDate = start!.toISOString();
		await updateLeave(values);
	};

	const validationSchema = yup.object({
		leaveType: yup.string().required(),
	});

	const handleDelete = async () => {
		await deleteLeave({
			endDate: end!.toISOString(),
			id: leaveEvent.id,
			leaveType: leaveEvent.title,
			startDate: start!.toISOString(),
		});
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});

	useEffect(() => {
		console.log(formik.values.leaveType);
	}, [formik.values.leaveType, formik.handleChange]);

	const handleCancel = (e: any) => {
		closeModal();
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<Modal open={open} onClose={closeModal}>
				<Fade in={open}>
					<Box sx={style}>
						<Stack
							direction='row'
							justifyContent='flex-end'
							alignItems='center'
							spacing={2}
						>
							<LoadingButton
								size='small'
								variant='text'
								startIcon={<DeleteIcon />}
								color='error'
								loading={loading}
								onClick={(e: any) => handleDelete()}
							/>
						</Stack>
						<Stack
							direction='column'
							justifyContent='center'
							alignItems='center'
							spacing={3}
							sx={{ marginBottom: '2rem' }}
						>
							<Typography id='modal-modal-title' variant='h6' component='h2'>
								Edit Leave
							</Typography>

							<FormControl variant='standard' fullWidth>
								<InputLabel id='typeLabel'>Leave Type</InputLabel>
								<Select
									labelId='typeLabel'
									id='type'
									name='type'
									value={formik.values.leaveType}
									onChange={formik.handleChange}
								>
									<MenuItem value={'AnnualLeave'}>Annual Leave</MenuItem>
									<MenuItem value={'SickLeave'}>Sick Leave</MenuItem>
									<MenuItem value={'StudyLeave'}>Study Leave</MenuItem>
								</Select>
							</FormControl>
							<DatePicker
								label='Start Date'
								value={start}
								onChange={(newValue) => {
									setStart(newValue);
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
							<DatePicker
								label='End Date'
								value={end}
								onChange={(newValue) => {
									setEnd(newValue);
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
						</Stack>
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
								size='small'
								type='submit'
								onClick={() => formik.handleSubmit()}
							>
								Submit
							</LoadingButton>
							<Button
								size='small'
								variant='contained'
								startIcon={<CancelIcon />}
								color='error'
								onClick={(e: any) => handleCancel(e)}
							>
								Cancel
							</Button>
						</Stack>
					</Box>
				</Fade>
			</Modal>
		</form>
	);
});
