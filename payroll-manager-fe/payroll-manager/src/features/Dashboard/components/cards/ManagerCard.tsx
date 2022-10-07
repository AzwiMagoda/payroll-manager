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
import PersonIcon from '@mui/icons-material/Person';
import React from 'react';
import { Link } from 'react-router-dom';

export default observer(function ManagerCard() {
	return (
		<Card sx={{ height: '100%' }}>
			<CardContent>
				<Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
					<Grid item>
						<Typography color='textSecondary' gutterBottom variant='overline'>
							Your Manager
						</Typography>
						<Typography color='textPrimary' variant='h4'>
							Brandon
						</Typography>
					</Grid>
					<Grid item>
						<Avatar
							sx={{
								backgroundColor: 'warning.main',
								height: 56,
								width: 56,
							}}
						>
							<PersonIcon />
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
					<ArrowDownwardIcon color='warning' />

					<Typography
						color='error'
						sx={{
							mr: 1,
						}}
						variant='body2'
					>
						<Link to={'/teamDetails/manager'}>
							<Button size='small'>View Details</Button>
						</Link>
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
});
