import { observer } from 'mobx-react-lite';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Typography,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
	leaveBalance: number;
}

export default observer(function LeaveDaysCard({ leaveBalance }: Props) {
	return (
		<Card sx={{ height: '100%' }}>
			<CardContent>
				<Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
					<Grid item>
						<Typography color='textSecondary' gutterBottom variant='overline'>
							Annual Leave Balance
						</Typography>
						<Typography color='textPrimary' variant='h4'>
							{leaveBalance}
						</Typography>
					</Grid>
					<Grid item>
						<Avatar
							sx={{
								backgroundColor: 'error.main',
								height: 56,
								width: 56,
							}}
						>
							<CalendarMonthIcon />
						</Avatar>
					</Grid>
				</Grid>
				<Box
					sx={{
						pt: 2,
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<ArrowDownwardIcon color='error' />

					<Typography
						color='error'
						sx={{
							mr: 1,
						}}
						variant='body2'
					>
						<Link to={'/leaveDashboard'}>
							<Button size='small'>View all days</Button>
						</Link>
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
});
