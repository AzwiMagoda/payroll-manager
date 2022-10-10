import React from 'react';
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
import { observer } from 'mobx-react-lite';
import { Employee } from '../../../../app/models/employee';

const user = {
	avatar: '/static/images/avatars/avatar_6.png',
	city: 'Los Angeles',
	country: 'USA',
	jobTitle: 'Senior Developer',
	name: 'Katarina Smith',
	timezone: 'GTM-7',
};

interface Props {
	employee: Employee;
}

export default observer(function UserDetails({ employee }: Props) {
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
						src={user.avatar}
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
						{employee.createdDate}
					</Typography>
					<Typography color='textSecondary' variant='body2'>
						{employee.jobTitle}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
});
