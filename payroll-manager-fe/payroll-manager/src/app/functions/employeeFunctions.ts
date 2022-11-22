import { toast } from 'react-toastify';
import agent from '../api/agent';
import { ContactDetailsDto } from '../models/contactDetailsDto';
import { Remuneration } from '../models/remuneration';

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

const getTeamBookedLeaveDays = async (teamName: string) => {
	try {
		const bookedDays = await agent.Leave.getTeamBookedLeaveDays(teamName);

		console.log(bookedDays);
		return bookedDays;
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

const getRemunerationId = async (employeeId: string) => {
	try {
		const remuneration = await agent.Remunerations.getRemunerationId(
			employeeId
		);

		return remuneration;
	} catch (error) {
		console.log(error);
	}
};

const createRemuneration = (remuneration: Remuneration) => {
	try {
		const response = agent.Remunerations.createRemuneration(remuneration);

		toast.promise(response, {
			pending: 'Submitting...',
			success: 'Created!',
			error: 'Failed to create',
		});
	} catch (error) {
		console.log(error);
	}
};

const updateRemuneration = (remuneration: Remuneration) => {
	try {
		const response = agent.Remunerations.updateRemuneration(remuneration);

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
	getRemunerationId,
	createRemuneration,
	updateRemuneration,
	getTeamBookedLeaveDays,
};
