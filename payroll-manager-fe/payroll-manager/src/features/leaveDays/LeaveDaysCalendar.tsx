import React, { useEffect, useState } from 'react';
import FullCalendar, {
	DateSelectArg,
	EventApi,
	EventClickArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import LeaveDayEdit from './LeaveDayEdit';
import { addDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import LeaveDayCreate from './LeaveDayCreate';

export default observer(function LeaveDaysCalendar() {
	const {
		employeeStore: { bookedLeaveDays },
		modalStore: { openModal, open },
	} = useStore();

	const [openEdit, setOpenEdit] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);
	const [editEvent, setEditEvent] = useState<EventApi>();
	const [createEvent, setCreateEvent] = useState<DateSelectArg>();

	const events = bookedLeaveDays!.map((leaveDays) => {
		return {
			id: leaveDays.id,
			title: leaveDays.leaveType,
			start: leaveDays.startDate,
			end: addDays(new Date(leaveDays.endDate), 1),
			allDay: true,
		};
	});

	useEffect(() => {
		if (!open) {
			setOpenEdit(false);
			setOpenCreate(false);
		}
	}, [open]);

	const onEventClick = (e: EventClickArg) => {
		setEditEvent(e.event);
		setOpenEdit(true);
		openModal();
	};

	const onDateSelect = (e: DateSelectArg) => {
		console.log(e);
		setCreateEvent(e);
		setOpenCreate(true);
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
				select={(e: DateSelectArg) => onDateSelect(e)}
			/>

			{openEdit && editEvent && (
				<LeaveDayEdit key={editEvent.id} leaveEvent={editEvent} />
			)}
			{openCreate && createEvent && (
				<LeaveDayCreate key={uuidv4()} leaveEvent={createEvent} />
			)}
		</>
	);
});
