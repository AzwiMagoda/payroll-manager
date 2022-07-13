import { Box, CardContent, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Dependant } from '../../../app/models/dependant';
import format from 'date-fns/format';
interface Props {
	dependant: Dependant;
}

export default observer(function DependantDetails({ dependant }: Props) {
	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component='div' variant='h6'>
						{dependant.name} {dependant.surname}
					</Typography>
					<Typography variant='body2' color='text.secondary' component='div'>
						DOB: {format(new Date(dependant.dateOfBirth), 'dd MMMM yyyy')}
					</Typography>
					<Typography variant='body2' color='text.secondary' component='div'>
						ID Number: {dependant.idNumber}
					</Typography>

					<Stack
						direction='row'
						justifyContent='space-evenly'
						alignItems='flex-end'
						spacing={2}
					>
						{dependant.cellphone !== '' ? (
							<Typography
								variant='body2'
								color='text.secondary'
								component='div'
							>
								Cell: {dependant.cellphone}
							</Typography>
						) : (
							<Typography
								variant='body2'
								color='text.secondary'
								component='div'
							>
								{' '}
							</Typography>
						)}
						{dependant.email !== '' ? (
							<Typography
								variant='body2'
								color='text.secondary'
								component='div'
							>
								Email: {dependant.email}
							</Typography>
						) : (
							<Typography
								variant='body2'
								color='text.secondary'
								component='div'
							>
								{' '}
							</Typography>
						)}
					</Stack>
				</CardContent>
			</Box>
		</>
	);
});
