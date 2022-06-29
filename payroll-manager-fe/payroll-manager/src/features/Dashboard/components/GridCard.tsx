import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Paper,
	Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

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
					<CardContent>
						<Typography
							sx={{ fontSize: 14 }}
							color='text.secondary'
							gutterBottom
						>
							{heading}
						</Typography>
						<Typography variant='h5' component='div'>
							{details}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size='small'>{linkText}</Button>
					</CardActions>
				</Card>
			</Paper>
		</Grid>
	);
});
