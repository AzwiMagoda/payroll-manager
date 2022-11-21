import { toast } from 'react-toastify';
import agent from '../api/agent';
import { ContactDetailsDto } from '../models/contactDetailsDto';

const getEmployee = async (employeeId: string) => {
	try {
		const employee = await agent.Employees.getEmployee(employeeId);
		return employee;
	} catch (error) {
		console.log(error);
	}
};

const getContactDetails = async (employeeId: string) => {
	try {
		const contactDetails = await agent.Employees.getContactDetails(employeeId);
		return contactDetails;
	} catch (error) {
		console.log(error);
	}
};

const createContactDetails = (contactDetails: ContactDetailsDto) => {
	try {
		const response = agent.Employees.createContactDetails(contactDetails);

		toast.promise(response, {
			pending: 'Submitting...',
			success: 'Created!',
			error: 'Failed to create',
		});
	} catch (error) {
		console.log(error);
	}
};

const updateContactDetails = async (contactDetails: ContactDetailsDto) => {
	try {
		const response = agent.Employees.updateContactDetails(contactDetails);

		toast.promise(response, {
			pending: 'Submitting...',
			success: 'Updated!',
			error: 'Failed to update',
		});
	} catch (error) {
		console.log(error);
	}
};

export {
	getEmployee,
	getContactDetails,
	updateContactDetails,
	createContactDetails,
};
