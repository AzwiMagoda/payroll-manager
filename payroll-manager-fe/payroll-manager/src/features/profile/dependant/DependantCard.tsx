import { useState } from 'react';
import { Avatar, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import { observer } from 'mobx-react-lite';
import { Dependant } from '../../../app/models/dependant';
import EditDependantForm from './EditDependantForm';
import PersonIcon from '@mui/icons-material/Person';
import DependantForm from './DependantForm';
import { useStore } from '../../../app/stores/store';

interface Props {
	dependant: Dependant;
}

export default observer(function DependantCard({ dependant }: Props) {
	const {
		employeeStore: { removeNewDependantFromArray, setHasNewDependant },
	} = useStore();

	const [editMode, setEditMode] = useState(false);

	const handleDelete = () => {
		if (dependant.name === '') {
			removeNewDependantFromArray();
			setHasNewDependant(false);
		}
	};
	return (
		<Paper
			sx={{
				p: 2,
				margin: 'auto',
				maxWidth: 500,
				flexGrow: 1,
			}}
		>
			<Grid container spacing={2}>
				<Grid item>
					<Avatar sx={{ width: 128, height: 128 }}>
						<PersonIcon sx={{ width: 'inherit', height: 'inherit' }} />
					</Avatar>
				</Grid>
				<Grid item xs={12} sm container>
					<Grid item xs container direction='column' spacing={2}>
						<Grid item xs>
							{!editMode ? (
								<DependantForm dependant={dependant} />
							) : (
								<EditDependantForm dependant={dependant} />
							)}
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Typography variant='subtitle1' component='div'>
						<Stack
							direction='column'
							justifyContent='flex-start'
							alignItems='flex-end'
							spacing={2}
						>
							{!editMode ? (
								<>
									<Button
										size='small'
										variant='text'
										startIcon={<EditIcon />}
										onClick={() => setEditMode(true)}
									/>
									<Button
										size='small'
										variant='text'
										startIcon={<DeleteIcon />}
										color='error'
										onClick={() => handleDelete()}
									/>
								</>
							) : (
								<>
									<Button
										size='small'
										variant='text'
										startIcon={<PublishIcon />}
										color='success'
									/>
									<Button
										size='small'
										variant='text'
										startIcon={<CancelIcon />}
										color='error'
										onClick={() => setEditMode(false)}
									/>
								</>
							)}
						</Stack>
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
});
