import agent from '../api/agent';

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

		console.log(contactDetails);
		return contactDetails;
	} catch (error) {
		console.log(error);
	}
};

export { getEmployee, getContactDetails };
