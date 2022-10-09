import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from '@mui/material';
import { Employee } from '../../app/models/employee';

interface Props {
	employee: Employee;
}

export default function ProfileDetails({ employee }: Props) {
	return (
		<Card>
			<CardContent>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Avatar
						sx={{
							height: 64,
							mb: 2,
							width: 64,
						}}
					/>
					<Typography color='textPrimary' gutterBottom variant='h5'>
						{employee.name} {employee.surname}
					</Typography>
					<Typography color='textSecondary' variant='body2'>
						{employee.email}
					</Typography>
					<Typography color='textSecondary' variant='body2'>
						{employee.createdDate}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}
