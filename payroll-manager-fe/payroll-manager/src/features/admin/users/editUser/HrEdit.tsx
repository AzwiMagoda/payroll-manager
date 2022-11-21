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
import PaidIcon from '@mui/icons-material/Paid';
import EmployeeProfileForm from './hrEditForms/EmployeeProfileForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactDetailsForm from './hrEditForms/ContactDetailsForm';
import { observer } from 'mobx-react-lite';
import RemunerationForm from './hrEditForms/RemunerationForm';

interface Props {
	employeeId: string;
}

export default observer(function HrEdit({ employeeId }: Props) {
	const theme = useTheme();

	const items = [
		{
			icon: <PersonIcon fontSize='large' />,
			title: 'Employee Profile',
			form: <EmployeeProfileForm employeeId={employeeId} />,
			color: theme.palette.primary.main,
		},
		{
			icon: <PermContactCalendarIcon fontSize='large' />,
			title: 'Contact Details',
			form: <ContactDetailsForm employeeId={employeeId} />,
			color: theme.palette.secondary.main,
		},
		{
			icon: <PaidIcon fontSize='large' />,
			title: 'Remuneration',
			form: <RemunerationForm employeeId={employeeId} />,
			color: theme.palette.warning.main,
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
