import {
	Avatar,
	Card,
	CardContent,
	Grid,
	Stack,
	Typography,
} from '@mui/material';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import GroupsIcon from '@mui/icons-material/Groups';
import { observer } from 'mobx-react-lite';
import { Employee } from '../../../../app/models/employee';

interface Props {
	employee: Employee;
}
export default observer(function ManagerTeamDetails({ employee }: Props) {
	return (
		<Card>
			<CardContent>
				<Grid
					container
					direction='row'
					justifyContent='space-around'
					alignItems='flex-start'
					spacing={2}
				>
					<Grid item xs={4}>
						<Stack
							direction='row'
							justifyContent='flex-start'
							alignItems='center'
							spacing={2}
						>
							<GroupsIcon sx={{ color: '#4B5563' }} />

							<Stack>
								<Typography variant='body2' sx={{ fontWeight: 600 }}>
									Team Name
								</Typography>
								<Typography variant='body2'>{employee.teamName}</Typography>
							</Stack>
						</Stack>
					</Grid>
					<Grid item xs={8}>
						<Stack
							direction='row'
							justifyContent='flex-start'
							alignItems='center'
							spacing={2}
						>
							<AccountCircleIcon sx={{ color: '#4B5563' }} />

							<Stack>
								<Typography variant='body2' sx={{ fontWeight: 600 }}>
									Manager
								</Typography>
								<Typography variant='body2'>{employee.manager}</Typography>
							</Stack>
						</Stack>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
});
