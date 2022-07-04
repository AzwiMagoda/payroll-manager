import { Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Dependant } from '../../../app/models/dependant';
import format from 'date-fns/format';
interface Props {
	dependant: Dependant;
}

export default observer(function DependantForm({ dependant }: Props) {
	return (
		<>
			<Stack
				direction='row'
				justifyContent='flex-start'
				alignItems='flex-start'
				spacing={1}
			>
				<Typography gutterBottom variant='subtitle1' component='div'>
					{dependant.name}
				</Typography>
				<Typography gutterBottom variant='subtitle1' component='div'>
					{dependant.surname}
				</Typography>
			</Stack>
			<Typography variant='body2' gutterBottom>
				DOB: {format(new Date(dependant.dateOfBirth), 'dd MMMM yyyy')}
			</Typography>
			<Typography variant='body2' color='text.secondary'>
				ID: {dependant.idNumber}
			</Typography>

			<Stack
				direction='row'
				justifyContent='flex-start'
				alignItems='center'
				spacing={12}
				sx={{ marginBottom: '0.5rem' }}
			>
				<Typography variant='body2' color='text.secondary'>
					Cell: {dependant.cellphone}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					Email: {dependant.email}
				</Typography>
			</Stack>
		</>
	);
});
