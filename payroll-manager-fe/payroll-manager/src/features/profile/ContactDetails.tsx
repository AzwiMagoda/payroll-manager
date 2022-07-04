import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ContactDetailsForm } from '../../app/models/contactDetailsForm';
import { useStore } from '../../app/stores/store';
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import CancelIcon from '@mui/icons-material/Cancel';

export default observer(function ContactDetails() {
	const {
		employeeStore: { currentEmployee, loading, updateContactDetails },
	} = useStore();

	const [editMode, setEditMode] = useState(false);
	const [readOnly, setReadOnly] = useState(true);
	const [checked, setChecked] = useState(
		currentEmployee!.physicalAddress === currentEmployee!.postalAddress
	);
	const [telephone, setTelephone] = useState(currentEmployee!.telephone);
	const [cellphone, setCellphone] = useState(currentEmployee!.cellphone);
	const [physicalAddress, setPhysicalAddress] = useState(
		currentEmployee!.physicalAddress
	);
	const [postalAddress, setPostalAddress] = useState(
		currentEmployee!.postalAddress
	);

	const handleChecked = (isChecked: boolean) => {
		isChecked ? setPostalAddress(physicalAddress) : setPostalAddress('');
		setChecked(isChecked);
	};

	const handlePhysical = (address: string) => {
		setPhysicalAddress(address);

		if (checked) {
			setPostalAddress(address);
		}
	};

	const handleEdit = () => {
		setEditMode(true);
		setReadOnly(false);
	};

	const handleCancel = () => {
		setEditMode(false);
		setReadOnly(true);
		setPhysicalAddress(currentEmployee!.physicalAddress);
		setPostalAddress(currentEmployee!.postalAddress);
		setCellphone(currentEmployee!.cellphone);
		setTelephone(currentEmployee!.telephone);
	};

	const handleSubmit = async () => {
		await updateContactDetails({
			postalAddress: postalAddress,
			cellphone: cellphone,
			physicalAddress: physicalAddress,
			telephone: telephone,
		});
		setEditMode(false);
		setReadOnly(true);
	};
	return (
		<Box
			onSubmit={() => handleSubmit()}
			onError={(errors) => console.log(errors)}
		>
			<Stack
				direction='row'
				justifyContent='center'
				alignItems='center'
				spacing={4}
			>
				<TextField
					margin='normal'
					variant='standard'
					fullWidth
					id='telephone'
					label='Telephone Number'
					name='telephone'
					type='text'
					InputProps={{
						readOnly: readOnly,
					}}
					value={telephone}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setTelephone(event.target.value)
					}
				/>
				<TextField
					margin='normal'
					variant='standard'
					fullWidth
					id='cellphone'
					label='Cellphone Number'
					name='cellphone'
					type='text'
					InputProps={{
						readOnly: readOnly,
					}}
					value={cellphone}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setCellphone(event.target.value)
					}
				/>
			</Stack>

			<FormControl fullWidth>
				<TextField
					margin='normal'
					variant='standard'
					fullWidth
					id='physicalAddress'
					label='Physical Address'
					name='physicalAddress'
					type='text'
					InputProps={{
						readOnly: readOnly,
					}}
					value={physicalAddress}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						handlePhysical(event.target.value)
					}
				/>
			</FormControl>

			<FormGroup>
				<FormControl>
					<TextField
						margin='normal'
						variant='standard'
						fullWidth
						id='postalAddress'
						label='Postal Address'
						name='postalAddress'
						type='text'
						InputProps={{
							readOnly: readOnly,
							disabled: checked,
						}}
						value={postalAddress}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setPostalAddress(event.target.value)
						}
					/>
				</FormControl>

				<FormControlLabel
					control={
						<Checkbox
							checked={checked}
							disabled={readOnly}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								handleChecked(event.target.checked)
							}
						/>
					}
					label='Same as physical'
				/>
			</FormGroup>

			<FormGroup>
				{!editMode ? (
					<Stack
						direction='row'
						justifyContent='center'
						alignItems='center'
						spacing={4}
					>
						<Button
							size='large'
							variant='contained'
							startIcon={<EditIcon />}
							onClick={() => handleEdit()}
						>
							Edit
						</Button>
					</Stack>
				) : (
					<Stack
						direction='row'
						justifyContent='center'
						alignItems='center'
						spacing={4}
					>
						<LoadingButton
							color='success'
							variant='contained'
							startIcon={<PublishIcon />}
							//onClick={() => handleSubmit()}
							loading={loading}
							loadingPosition='start'
							size='large'
							type='submit'
						>
							Submit
						</LoadingButton>
						<Button
							color='error'
							variant='contained'
							startIcon={<CancelIcon />}
							onClick={() => handleCancel()}
							size='large'
						>
							Cancel
						</Button>
					</Stack>
				)}
			</FormGroup>
		</Box>
	);
});
