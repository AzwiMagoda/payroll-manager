import {
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
} from '@mui/material';
import React from 'react';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PersonIcon from '@mui/icons-material/Person';
import EmployeeProfileForm from './hrEditForms/EmployeeProfileForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function HrEdit() {
	const items = [
		{
			icon: <PersonIcon />,
			title: 'Employee Profile',
			form: <EmployeeProfileForm />,
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
}
