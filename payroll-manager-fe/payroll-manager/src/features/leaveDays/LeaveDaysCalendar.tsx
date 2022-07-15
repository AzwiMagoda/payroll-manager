import React, { useEffect, useState } from 'react';
import FullCalendar, { EventApi, EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import LeaveDayEdit from './LeaveDayEdit';
import { addDays } from 'date-fns';

export default observer(function LeaveDaysCalendar() {
	const {
		employeeStore: { bookedLeaveDays },
		modalStore: { openModal },
	} = useStore();

	const [open, setOpen] = useState(false);
	const [event, setEvent] = useState<EventApi>();

	const events = bookedLeaveDays!.map((leaveDays) => {
		return {
			id: leaveDays.id,
			title: leaveDays.leaveType,
			start: leaveDays.startDate,
			end: addDays(new Date(leaveDays.endDate), 1),
			allDay: true,
		};
	});

	useEffect(() => {}, [bookedLeaveDays]);

	const onEventClick = (e: EventClickArg) => {
		setOpen(true);
		console.log(e.event);
		setEvent(e.event);
		openModal();
	};

	return (
		<>
			<FullCalendar
				plugins={[interactionPlugin, dayGridPlugin]}
				initialView='dayGridMonth'
				themeSystem='standard'
				height='auto'
				events={events}
				eventClick={(e: EventClickArg) => onEventClick(e)}
				editable={true}
				weekends={false}
				selectable={true}
				selectOverlap={false}
			/>

			{open && event && <LeaveDayEdit leaveEvent={event} />}
		</>
	);
});
