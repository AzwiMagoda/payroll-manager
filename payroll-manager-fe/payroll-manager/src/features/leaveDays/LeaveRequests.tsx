import { Card, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useStore } from '../../app/stores/store';
import { columns } from './GridColumns';
import { format } from 'date-fns';

export default function LeaveRequests() {
	const {
		employeeStore: {
			currentEmployee,
			employeeLeaveDays,
			getEmployeeBookedLeaveDays,
		},
	} = useStore();

	useEffect(() => {
		getEmployeeBookedLeaveDays();
	}, []);

	return (
		<Card>
			<Box sx={{ height: 400, width: '100%' }}>
				{employeeLeaveDays && (
					<DataGrid
						rows={employeeLeaveDays}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						disableSelectionOnClick
						experimentalFeatures={{ newEditingApi: true }}
					/>
				)}
			</Box>
		</Card>
	);
}
