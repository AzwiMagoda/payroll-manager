import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { observer } from 'mobx-react-lite';

export default observer(function LeaveDaysCalendar() {
	return (
		<FullCalendar
			plugins={[dayGridPlugin]}
			initialView='dayGridMonth'
			themeSystem='standard'
			height={'auto'}
		/>
	);
});
