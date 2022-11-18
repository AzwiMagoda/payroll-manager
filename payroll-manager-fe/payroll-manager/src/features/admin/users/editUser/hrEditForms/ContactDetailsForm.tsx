import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Stack,
	TextField,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import FormBase from '../../../../../app/common/form/FormBase';
import SaveIcon from '@mui/icons-material/Save';
import { ContactDetailsDto } from '../../../../../app/models/contactDetailsDto';

interface Props {
	contactDetails: ContactDetailsDto | undefined;
}

export default observer(function ContactDetailsForm({ contactDetails }: Props) {
	const [email, setEmail] = useState('');
	const [cellphone, setCellphone] = useState('');
	const [telephone, setTelephone] = useState('');
	const [physicalAddress, setPhysicalAddress] = useState('');
	const [postalAddress, setPostalAddress] = useState('');

	const [isSameAsPhysical, setIsSameAsPhysical] = useState(false);

	const textFieldsLeft = [
		{
			id: 'email',
			value: email,
			label: 'Personal Email',
			onChange: setEmail,
		},
		{
			id: 'cellphone',
			value: cellphone,
			label: 'Cellphone No.',
			onChange: setCellphone,
		},
		{
			id: 'telephone',
			value: telephone,
			label: 'Telephone No.',
			onChange: setTelephone,
		},
	];

	const textFieldsRight = [
		{
			id: 'physicalAddress',
			value: physicalAddress,
			label: 'Physical Address',
			onChange: setPhysicalAddress,
		},
		{
			id: 'postalAddress',
			value: postalAddress,
			label: 'Postal Address',
			onChange: setPostalAddress,
		},
	];

	const onSaveClick = () => {};

	const onCheckboxSelectionChange = (checked: boolean) => {
		setIsSameAsPhysical(checked);

		if (checked === true) {
			setPostalAddress(physicalAddress);
		} else {
			setPostalAddress('');
		}
	};

	useEffect(() => {
		if (isSameAsPhysical === true) {
			setPostalAddress(physicalAddress);
		}
	}, [physicalAddress]);

	const left = [
		<>
			{textFieldsLeft.map((item, index) => (
				<TextField
					key={index}
					margin='normal'
					id={item.id}
					label={item.label}
					name={item.id}
					type='text'
					autoFocus
					autoComplete='off'
					fullWidth
					value={item.value}
					onChange={(
						e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
					) => item.onChange(e.target.value)}
				/>
			))}
		</>,
	];
	const right: any = [
		<>
			{textFieldsRight.map((item, index) => (
				<TextField
					key={index}
					margin='normal'
					id={item.id}
					label={item.label}
					name={item.id}
					type='text'
					autoFocus
					autoComplete='off'
					fullWidth
					value={item.value}
					onChange={(
						e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
					) => item.onChange(e.target.value)}
				/>
			))}
		</>,
		<FormControlLabel
			control={
				<Checkbox
					checked={isSameAsPhysical}
					onChange={(e: any) => onCheckboxSelectionChange(e.target.checked)}
				/>
			}
			label='Same as physical address'
		/>,
	];

	return (
		<>
			<FormBase leftComponents={left} rightComponents={right} />

			<Stack
				direction='row'
				justifyContent='flex-end'
				alignItems='center'
				spacing={4}
			>
				<Button
					startIcon={<SaveIcon fontSize='small' />}
					sx={{ mr: 1 }}
					onClick={() => onSaveClick()}
					color='primary'
					variant='contained'
				>
					Save Changes
				</Button>
			</Stack>
		</>
	);
});
