import { useEffect, useState } from 'react';
import FullCalendar, {
	DateSelectArg,
	EventApi,
	EventClickArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { addDays } from 'date-fns';
import { BookedLeaveDays } from '../../app/models/bookedLeaveDays';

interface Props {
	bookedLeaveDays: BookedLeaveDays[];
}

export default observer(function LeaveDaysCalendar({ bookedLeaveDays }: Props) {
	const {
		modalStore: { openModal, open },
	} = useStore();

	const [openEdit, setOpenEdit] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);
	const [editEvent, setEditEvent] = useState<EventApi>();
	const [createEvent, setCreateEvent] = useState<DateSelectArg>();

	const events = bookedLeaveDays.map((leaveDays) => {
		return {
			id: leaveDays.id,
			title: leaveDays.leaveType,
			start: leaveDays.startDate,
			end: addDays(new Date(leaveDays.endDate), 1),
			allDay: true,
			approved: leaveDays.approved,
			employeeId: leaveDays.employeeId,
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
				editable={false}
				weekends={false}
				selectable={true}
				selectOverlap={true}
				select={(e: DateSelectArg) => onDateSelect(e)}
			/>
		</>
	);
});
