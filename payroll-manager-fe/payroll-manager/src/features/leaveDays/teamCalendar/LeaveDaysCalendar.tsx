import FullCalendar, {
	DateSelectArg,
	EventClickArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { observer } from 'mobx-react-lite';
import { addDays } from 'date-fns';
import { BookedLeaveDays } from '../../../app/models/bookedLeaveDays';

interface Props {
	bookedLeaveDays: BookedLeaveDays[];
	teamList: any[];
}

export default observer(function LeaveDaysCalendar({
	bookedLeaveDays,
	teamList,
}: Props) {
	const events = bookedLeaveDays.map((leaveDays) => {
		return {
			id: leaveDays.id,
			title: `${leaveDays.leaveType} - ${leaveDays.name} ${leaveDays.surname}`,
			start: leaveDays.startDate,
			end: addDays(new Date(leaveDays.endDate), 1),
			allDay: true,
			color: teamList.find(
				(x) => x.name === leaveDays.name && x.surname === leaveDays.surname
			)?.color,
			textColor: '#FFFFFF',
		};
	});

	const onEventClick = (e: EventClickArg) => {};

	const onDateSelect = (e: DateSelectArg) => {};

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
