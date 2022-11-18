import {
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PersonIcon from '@mui/icons-material/Person';
import EmployeeProfileForm from './hrEditForms/EmployeeProfileForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactDetailsForm from './hrEditForms/ContactDetailsForm';
import { UserDetails } from '../../../../app/models/userDetails';
import { useStore } from '../../../../app/stores/store';
import { Employee } from '../../../../app/models/employee';
import { observer } from 'mobx-react-lite';

interface Props {
	user: UserDetails;
	employee: Employee;
}

export default observer(function HrEdit({ user, employee }: Props) {
	const items = [
		{
			icon: <PersonIcon />,
			title: 'Employee Profile',
			form: <EmployeeProfileForm employee={employee} />,
			prop: employee,
		},
		{
			icon: <PermContactCalendarIcon />,
			title: 'Contact Details',
			form: <ContactDetailsForm />,
		},
	];

	return (
		<>
			{items.map((item, index) => (
				<Accordion key={index}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`${index}-panel`}
						id={`${index}-header`}
					>
						{item.icon}
						<Typography>{item.title}</Typography>
					</AccordionSummary>
					<AccordionDetails>{item.form}</AccordionDetails>
				</Accordion>
			))}
		</>
	);
});
