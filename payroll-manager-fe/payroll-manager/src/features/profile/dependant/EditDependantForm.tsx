import React, { useState } from 'react';
import { Box, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { observer } from 'mobx-react-lite';
import { Dependant } from '../../../app/models/dependant';

interface Props {
	dependant: Dependant;
}

export default observer(function EditDependantForm({ dependant }: Props) {
	const [dob, setDob] = React.useState<Date | null>(
		new Date(dependant.dateOfBirth)
	);
	const [name, setName] = useState(dependant.name);
	const [surname, setSurname] = useState(dependant.surname);
	const [idNumber, setIdNumber] = useState(dependant.idNumber);
	const [cellphone, setCellphone] = useState(dependant.cellphone);
	const [email, setEmail] = useState(dependant.email);
	return (
		<Box component='form' noValidate autoComplete='off'>
			<Stack
				direction='row'
				justifyContent='flex-start'
				alignItems='center'
				spacing={1}
			>
				<TextField
					variant='standard'
					margin='dense'
					id='name'
					label='Name'
					name='name'
					type='text'
					value={name}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setName(event.target.value)
					}
				/>
				<TextField
					variant='standard'
					margin='dense'
					id='surname'
					label='Surname'
					name='surname'
					type='text'
					value={surname}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setSurname(event.target.value)
					}
				/>
			</Stack>
			<DatePicker
				label='Date of Birth'
				value={dob}
				onChange={(newValue) => {
					setDob(newValue);
				}}
				renderInput={(params) => (
					<TextField fullWidth variant='standard' margin='dense' {...params} />
				)}
			/>
			<TextField
				fullWidth
				variant='standard'
				margin='dense'
				id='idNumber'
				label='Id Number'
				name='idNumber'
				type='text'
				value={idNumber}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
					setIdNumber(event.target.value)
				}
			/>

			<Stack
				direction='row'
				justifyContent='flex-start'
				alignItems='center'
				spacing={1}
				sx={{ marginBottom: '0.5rem' }}
			>
				<TextField
					variant='standard'
					margin='dense'
					id='cellphone'
					label='Cellphone No.'
					name='cellphone'
					type='text'
					value={cellphone}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setCellphone(event.target.value)
					}
				/>
				<TextField
					variant='standard'
					margin='dense'
					id='email'
					label='Email Address'
					name='email'
					type='email'
					value={email}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setEmail(event.target.value)
					}
				/>
			</Stack>
		</Box>
	);
});
