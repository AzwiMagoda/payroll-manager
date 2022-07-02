import {
	Box,
	Button,
	ButtonGroup,
	Card,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../../../app/stores/store';
import DependantCard from './DependantCard';
import { Dependant } from '../../../app/models/dependant';

export default observer(function Dependants() {
	const {
		employeeStore: { dependants, addNewDependantToArray },
	} = useStore();
	const [hasNewDependant, setHasNewDependant] = useState(false);

	const newDependant: Dependant = {
		name: '',
		surname: '',
		idNumber: '',
		dateOfBirth: '',
		cellphone: '',
		email: '',
		createdDate: '',
		id: uuidv4(),
	};

	const handleAddDependant = () => {
		if (!hasNewDependant) {
			setHasNewDependant(true);
			addNewDependantToArray(newDependant);
		} else {
			console.log('edit or remove');
		}
	};

	return (
		<Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
			<Stack
				direction='row'
				justifyContent='flex-end'
				alignItems='center'
				spacing={2}
				sx={{ margin: '2rem' }}
			>
				<Button
					size='small'
					variant='contained'
					startIcon={<AddIcon />}
					onClick={() => handleAddDependant()}
					disabled={hasNewDependant}
				>
					Add Dependant
				</Button>
			</Stack>
			<Stack
				direction='column'
				justifyContent='flex-start'
				alignItems='flex-start'
				spacing={2}
			>
				{dependants.map((dependant) => (
					<DependantCard key={dependant.id} dependant={dependant} />
				))}
			</Stack>
		</Box>
	);
});
