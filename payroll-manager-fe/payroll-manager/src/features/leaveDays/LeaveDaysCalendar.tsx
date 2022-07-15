import React, { useEffect, useState } from 'react';
import FullCalendar, { EventApi, EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Box, Fade, Modal, Stack, Typography } from '@mui/material';
import LeaveDayEdit from './LeaveDayEdit';

export default observer(function LeaveDaysCalendar() {
	const {
		employeeStore: { bookedLeaveDays, leaveDays },
		modalStore: { openModal },
	} = useStore();

	const [open, setOpen] = useState(false);
	const [event, setEvent] = useState<EventApi>();

	const events = bookedLeaveDays!.map((leaveDays) => {
		return {
			id: leaveDays.id,
			title: leaveDays.leaveType,
			start: leaveDays.startDate,
			end: leaveDays.endDate,
		};
	});

	const onEventClick = (e: EventClickArg) => {
		setOpen(true);
		setEvent(e.event);
		openModal();
	};

	return (
		<>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView='dayGridMonth'
				themeSystem='standard'
				height='auto'
				events={events}
				eventClick={(e: EventClickArg) => onEventClick(e)}
				editable={true}
				weekends={false}
			/>

			{open && event && <LeaveDayEdit leaveEvent={event} />}
		</>
	);
});
