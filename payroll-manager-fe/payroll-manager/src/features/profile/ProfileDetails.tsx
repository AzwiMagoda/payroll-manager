import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Employee } from '../../app/models/employee';

interface Props {
	employee: Employee;
}

export default observer(function ProfileDetails({ employee }: Props) {
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
						{employee.name}.{employee.surname}@42Company.com
					</Typography>
					<Typography color='textSecondary' variant='body2'>
						{employee.createdDate}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
});
