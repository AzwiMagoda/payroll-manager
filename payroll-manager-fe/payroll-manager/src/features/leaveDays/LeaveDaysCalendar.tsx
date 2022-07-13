import React, { useEffect } from 'react';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import LeaveDayEdit from './LeaveDayEdit';

export default observer(function LeaveDaysCalendar() {
	const {
		employeeStore: { bookedLeaveDays, loading },
	} = useStore();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const events = bookedLeaveDays!.map((leaveDays) => {
		return {
			id: leaveDays.id,
			title: leaveDays.leaveType,
			start: leaveDays.startDate,
			end: leaveDays.endDate,
		};
	});

	const onEventClick = (e: EventClickArg) => {
		console.log(e.event.id);
		handleOpen();
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
			/>
			{open && <LeaveDayEdit open={open} />}
		</>
	);
});
