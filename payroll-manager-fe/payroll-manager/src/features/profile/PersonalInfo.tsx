import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Panel, Form, ButtonToolbar, Button } from 'rsuite';
import { PersonalInfoForm } from '../../app/models/personalInfoForm';
import { useStore } from '../../app/stores/store';

export default observer(function PersonalInfo() {
	const {
		employeeStore: { currentEmployee, loading, updatePersonalInfo },
	} = useStore();

	const initialValues: PersonalInfoForm = {
		department: currentEmployee!.department ?? '',
		email: currentEmployee!.email ?? '',
		jobTitle: currentEmployee!.jobTitle ?? '',
		name: currentEmployee!.name ?? '',
		surname: currentEmployee!.surname ?? '',
		title: currentEmployee!.title ?? '',
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
		await updatePersonalInfo(formValue);
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
				<Form.Group controlId='title'>
					<Form.ControlLabel>Title</Form.ControlLabel>
					<Form.Control name='title' />
				</Form.Group>

				<Form.Group controlId='name'>
					<Form.ControlLabel>Name</Form.ControlLabel>
					<Form.Control name='name' />
				</Form.Group>

				<Form.Group controlId='surname'>
					<Form.ControlLabel>Surname</Form.ControlLabel>
					<Form.Control name='surname' />
				</Form.Group>

				<Form.Group controlId='department'>
					<Form.ControlLabel>Department</Form.ControlLabel>
					<Form.Control name='department' disabled={editMode} />
				</Form.Group>

				<Form.Group controlId='jobTitle'>
					<Form.ControlLabel>Job Title</Form.ControlLabel>
					<Form.Control name='jobTitle' disabled={editMode} />
				</Form.Group>

				<Form.Group controlId='email'>
					<Form.ControlLabel>Email</Form.ControlLabel>
					<Form.Control name='email' type='email' disabled={editMode} />
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
