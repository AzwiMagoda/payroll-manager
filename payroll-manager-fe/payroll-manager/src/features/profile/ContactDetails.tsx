import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Panel, Form, ButtonToolbar, Button } from 'rsuite';
import { ContactDetailsForm } from '../../app/models/contactDetailsForm';
import { useStore } from '../../app/stores/store';

export default observer(function ContactDetails() {
	const {
		employeeStore: { currentEmployee, loading, updateContactDetails },
	} = useStore();

	const initialValues: ContactDetailsForm = {
		postalAddress: currentEmployee!.postalAddress ?? '',
		cellphone: currentEmployee!.cellphone ?? '',
		physicalAddress: currentEmployee!.physicalAddress ?? '',
		telephone: currentEmployee!.telephone ?? '',
	};

	const [formValue, setFormValue] = useState<any>(initialValues);
	const [editMode, setEditMode] = useState(false);
	const [readOnly, setReadOnly] = useState(true);

	const handleEdit = () => {
		setEditMode(true);
		setReadOnly(false);
	};

	const handleCancel = () => {
		setFormValue(initialValues);
		setEditMode(false);
		setReadOnly(true);
	};

	const handleSubmit = async () => {
		await updateContactDetails(formValue);
		setEditMode(false);
		setReadOnly(true);
	};
	return (
		<Panel>
			<Form
				layout='horizontal'
				readOnly={readOnly}
				formValue={formValue}
				onChange={(formValues) => setFormValue(formValues)}
			>
				<Form.Group controlId='telephone'>
					<Form.ControlLabel>Telephone</Form.ControlLabel>
					<Form.Control name='telephone' />
				</Form.Group>

				<Form.Group controlId='cellphone'>
					<Form.ControlLabel>Cellphone</Form.ControlLabel>
					<Form.Control name='cellphone' />
				</Form.Group>

				<Form.Group controlId='physicalAddress'>
					<Form.ControlLabel>Physical Address</Form.ControlLabel>
					<Form.Control name='physicalAddress' />
				</Form.Group>

				<Form.Group controlId='postalAddress'>
					<Form.ControlLabel>Postal Address</Form.ControlLabel>
					<Form.Control name='postalAddress' />
				</Form.Group>

				<Form.Group>
					<ButtonToolbar>
						{!editMode ? (
							<Button
								appearance='primary'
								size='lg'
								onClick={() => handleEdit()}
							>
								Edit
							</Button>
						) : (
							<>
								<Button
									appearance='primary'
									size='lg'
									onClick={() => handleSubmit()}
									loading={loading}
								>
									Submit
								</Button>
								<Button
									appearance='default'
									size='lg'
									onClick={() => handleCancel()}
								>
									Cancel
								</Button>
							</>
						)}
					</ButtonToolbar>
				</Form.Group>
			</Form>
		</Panel>
	);
});
