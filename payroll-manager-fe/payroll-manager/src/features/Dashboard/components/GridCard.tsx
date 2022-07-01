import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface Props {
	heading: string;
	details: string;
	linkText: string;
	size: number;
}

export default observer(function GridCard({
	heading,
	details,
	linkText,
	size,
}: Props) {
	return (
		<Grid item xs={size}>
			<Paper elevation={3}>
				<Card variant='outlined'>
					<Stack
						direction='row'
						spacing={1}
						justifyContent='center'
						alignItems='stretch'
					>
						<CardContent>
							<Avatar
								sx={{
									width: 56,
									height: 56,
								}}
							>
								<CalendarMonthIcon />
							</Avatar>
						</CardContent>

						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color='text.secondary'
								gutterBottom
							>
								{heading}
							</Typography>
							<Typography variant='h6' component='div'>
								{details}
							</Typography>
						</CardContent>
					</Stack>
					<CardActions>
						<Button size='small'>{linkText}</Button>
					</CardActions>
				</Card>
			</Paper>
		</Grid>
	);
});
