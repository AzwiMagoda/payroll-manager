import { DateSelectArg, EventApi } from '@fullcalendar/react';
import {
	Box,
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BookedLeaveDays } from '../../app/models/bookedLeaveDays';
import { LoadingButton } from '@mui/lab';
import PublishIcon from '@mui/icons-material/Publish';
import { addDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

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
	leaveEvent: DateSelectArg;
}

export default observer(function LeaveDayCreate({ leaveEvent }: Props) {
	const {
		modalStore: { open, closeModal },
		employeeStore: { loading },
	} = useStore();

	const [start, setStart] = useState<Date | null>(leaveEvent.start);
	const [end, setEnd] = useState<Date | null>(addDays(leaveEvent.end!, -1));

	const initialValues: BookedLeaveDays = {
		endDate: end!.toISOString(),
		id: uuidv4(),
		leaveType: 'AnnualLeave',
		startDate: start!.toISOString(),
	};

	const handleSubmit = async (values: BookedLeaveDays) => {
		console.log(start);
		console.log(end);
		console.log(values);
	};

	const formik: any = useFormik({
		initialValues: initialValues,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Modal open={open} onClose={closeModal}>
				<Fade in={open}>
					<Box sx={style}>
						<Stack
							direction='column'
							justifyContent='center'
							alignItems='center'
							spacing={3}
						>
							<Typography id='modal-modal-title' variant='h6' component='h2'>
								Book Leave
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

							<LoadingButton
								color='success'
								variant='contained'
								startIcon={<PublishIcon />}
								loading={loading}
								loadingPosition='start'
								size='large'
								type='submit'
								onClick={formik.handleSubmit}
							>
								Submit
							</LoadingButton>
						</Stack>
					</Box>
				</Fade>
			</Modal>
		</form>
	);
});
