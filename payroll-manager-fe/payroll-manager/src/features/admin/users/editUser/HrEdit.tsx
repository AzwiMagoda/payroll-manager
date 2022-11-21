import {
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	useTheme,
	Stack,
} from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PersonIcon from '@mui/icons-material/Person';
import EmployeeProfileForm from './hrEditForms/EmployeeProfileForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactDetailsForm from './hrEditForms/ContactDetailsForm';
import { Employee } from '../../../../app/models/employee';
import { observer } from 'mobx-react-lite';
import { ContactDetailsDto } from '../../../../app/models/contactDetailsDto';

interface Props {
	employee: Employee;
}

export default observer(function HrEdit({ employee }: Props) {
	const theme = useTheme();

	const items = [
		{
			icon: <PersonIcon fontSize='large' />,
			title: 'Employee Profile',
			form: <EmployeeProfileForm employee={employee} />,
			color: theme.palette.primary.main,
		},
		{
			icon: <PermContactCalendarIcon fontSize='large' />,
			title: 'Contact Details',
			form: <ContactDetailsForm employeeId={employee.employeeId!} />,
			color: theme.palette.secondary.main,
		},
	];

	return (
		<>
			{items.map((item, index) => (
				<Accordion
					key={index}
					sx={{ marginBottom: 3, backgroundColor: '#F9FAFC' }}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`${index}-panel`}
						id={`${index}-header`}
						sx={{
							borderLeft: `7px solid ${item.color}`,
						}}
					>
						<Stack
							direction='row'
							justifyContent='center'
							alignItems='center'
							spacing={3}
						>
							{item.icon}
							<Typography variant='h6' align='center'>
								{item.title}
							</Typography>
						</Stack>
					</AccordionSummary>
					<AccordionDetails>{item.form}</AccordionDetails>
				</Accordion>
			))}
		</>
	);
});
