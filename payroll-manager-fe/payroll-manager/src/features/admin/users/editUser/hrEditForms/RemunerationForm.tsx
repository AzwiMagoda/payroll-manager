import React, { useEffect } from 'react';
import { getRemunerationId } from '../../../../../app/functions/employeeFunctions';

interface Props {
	employeeId: string;
}
export default function RemunerationForm({ employeeId }: Props) {
	useEffect(() => {
		console.log(getRemunerationId(employeeId));
	}, []);

	return <div>RemunerationForm</div>;
}
