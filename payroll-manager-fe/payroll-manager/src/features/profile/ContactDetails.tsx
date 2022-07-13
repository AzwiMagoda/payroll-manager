import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ContactDetailsForm } from '../../app/models/contactDetailsForm';
import { useStore } from '../../app/stores/store';
import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Stack,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import CancelIcon from '@mui/icons-material/Cancel';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MaskedText from '../../app/common/form/MaskedText';
import TextFieldInput from '../../app/common/form/TextFieldInput';

export default observer(function ContactDetails() {
	const {
		employeeStore: { currentEmployee, loading, updateContactDetails },
	} = useStore();

	const [editMode, setEditMode] = useState(false);
	const [readOnly, setReadOnly] = useState(true);
	const [checked, setChecked] = useState(
		currentEmployee!.physicalAddress === currentEmployee!.postalAddress
	);

	const initialValues: ContactDetailsForm = {
		cellphone: currentEmployee!.cellphone,
		physicalAddress: currentEmployee!.physicalAddress,
		postalAddress: currentEmployee!.postalAddress,
		telephone: currentEmployee!.telephone,
	};

	const validationSchema = yup.object({
		telephone: yup.string().min(10, 'Please enter a valid telephone number'),
		cellphone: yup
			.string()
			.min(10, 'Please enter a valid cellphone number')
			.required('Required'),
		physicalAddress: yup.string().required('Required'),
		postalAddress: yup.string(),
	});

	const handleSubmit = async (values: ContactDetailsForm) => {
		await updateContactDetails(values);
		setEditMode(false);
		setReadOnly(true);
	};

	const formik: any = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		},
	});

	const handleChecked = async (isChecked: boolean) => {
		isChecked
			? await formik.setFieldValue(
					'postalAddress',
					formik.values.physicalAddress
			  )
			: await formik.setFieldValue('postalAddress', ' ');
		setChecked(isChecked);
	};

	const handleEdit = () => {
		setEditMode(true);
		setReadOnly(false);
	};

	const handleCancel = (e: any) => {
		setEditMode(false);
		setReadOnly(true);
		formik.handleReset(e);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<Stack
				direction='row'
				justifyContent='center'
				alignItems='center'
				spacing={4}
			>
				<TextFieldInput
					id='cellphone'
					label='Cellphone Number'
					inputProps={{
						readOnly: readOnly,
						inputComponent: MaskedText as any,
					}}
					type='text'
					error={formik.touched.cellphone && Boolean(formik.errors.cellphone)}
					helperText={
						(formik.touched.cellphone && formik.errors.cellphone) ?? ' '
					}
					value={formik.values.cellphone}
					onChange={formik.handleChange}
				/>
				<TextFieldInput
					id='telephone'
					label='Telephone Number'
					type='text'
					inputProps={{
						readOnly: readOnly,
						inputComponent: MaskedText as any,
					}}
					error={formik.touched.telephone && Boolean(formik.errors.telephone)}
					helperText={
						(formik.touched.telephone && formik.errors.telephone) ?? ' '
					}
					value={formik.values.telephone}
					onChange={formik.handleChange}
				/>
			</Stack>

			<FormControl fullWidth>
				<TextFieldInput
					id='physicalAddress'
					label='Physical Address'
					type='text'
					inputProps={{
						readOnly: readOnly,
					}}
					value={formik.values.physicalAddress}
					onChange={formik.handleChange}
					error={
						formik.touched.physicalAddress &&
						Boolean(formik.errors.physicalAddress)
					}
					helperText={
						(formik.touched.physicalAddress && formik.errors.physicalAddress) ??
						' '
					}
				/>
			</FormControl>

			<FormGroup>
				<FormControl>
					<TextFieldInput
						id='postalAddress'
						label='Postal Address'
						type='text'
						inputProps={{
							readOnly: readOnly,
							disabled: checked,
						}}
						value={formik.values.postalAddress}
						onChange={formik.handleChange}
						error={
							formik.touched.postalAddress &&
							Boolean(formik.errors.postalAddress)
						}
						helperText={
							(formik.touched.postalAddress && formik.errors.postalAddress) ??
							' '
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
							onClick={(e: any) => handleCancel(e)}
							size='large'
						>
							Cancel
						</Button>
					</Stack>
				)}
			</FormGroup>
		</form>
	);
});
