import { mapHash } from '@fullcalendar/react';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
	Box,
	Card,
	FormControl,
	Grid,
	InputLabel,
	Link,
	MenuItem,
	Select,
	Stack,
	TextField,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../app/stores/store';
import { BookLeave as BookLeaveDto } from '../../app/models/bookLeave';

export default observer(function BookLeave() {
	const leaveTypes = ['Annual Leave', 'Sick Leave', 'Study Leave'];
	const [leaveValue, setLeaveValue] = useState(0);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [errorText, setErrorText] = useState('');

	const {
		employeeStore: { bookLeave, loading },
	} = useStore();

	const onSubmit = () => {
		let leave: BookLeaveDto = {
			leaveType: leaveValue,
			startDate: startDate,
			endDate: endDate,
		};

		bookLeave(leave);
	};

	const onStartDateChange = (date: Date) => {
		setStartDate(date);
		setEndDate(date);
	};

	useEffect(() => {
		if (endDate < startDate) {
			setErrorText('End date cannot be before start date');
		} else {
			setErrorText('');
		}
	}, [endDate]);

	return (
		<Card>
			<Stack
				direction='row'
				justifyContent='center'
				alignItems='center'
				spacing={2}
			>
				<Box
					component='form'
					onSubmit={() => onSubmit()}
					noValidate
					sx={{ mt: 1, width: '40%' }}
				>
					<FormControl fullWidth margin='normal'>
						<InputLabel id='lblLeaveType'>Leave Type</InputLabel>
						<Select
							labelId='lblLeaveType'
							id='leaveType'
							value={leaveValue}
							label='Leave Type'
							onChange={(e) => setLeaveValue(e.target.value as number)}
						>
							{leaveTypes.map((leaveType, i) => (
								<MenuItem key={i} value={i}>
									{leaveType}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth margin='normal'>
						<DatePicker
							label='Start Date'
							value={startDate}
							onChange={(newValue) => {
								if (newValue !== null) onStartDateChange(newValue);
							}}
							renderInput={(params) => (
								<TextField variant='outlined' {...params} />
							)}
						/>
					</FormControl>

					<FormControl fullWidth margin='normal'>
						<DatePicker
							label='End Date'
							value={endDate}
							onChange={(newValue) => {
								if (newValue !== null) setEndDate(newValue);
							}}
							renderInput={(params) => (
								<TextField
									// error={true}
									variant='outlined'
									{...params}
									helperText={errorText}
								/>
							)}
						/>
					</FormControl>

					<LoadingButton
						type='submit'
						fullWidth
						variant='contained'
						loading={loading}
						sx={{ mt: 3, mb: 2 }}
						disabled={endDate < startDate}
					>
						Submit
					</LoadingButton>
				</Box>
			</Stack>
		</Card>
	);
});
