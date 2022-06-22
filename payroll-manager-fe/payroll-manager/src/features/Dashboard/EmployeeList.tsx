import React from 'react';
import { Employee } from '../../app/models/employee';
import { observer } from 'mobx-react-lite';

interface Props {
	employees: Array<Employee>;
}

export default observer(function EmployeeList({ employees }: Props) {
	return (
		<div style={{ display: 'flex', height: 300, width: '100%' }}>
			<div style={{ flexGrow: 1 }}>Hey</div>
		</div>
	);
});
