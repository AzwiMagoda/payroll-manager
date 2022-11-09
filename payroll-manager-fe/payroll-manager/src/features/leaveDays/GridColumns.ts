import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
	{
		field: 'name',
		headerName: 'First name',
		width: 150,
	},
	{
		field: 'startDate',
		headerName: 'Start Date',
		type: 'date',
		width: 150,
	},
	{
		field: 'endDate',
		headerName: 'End Date',
		type: 'date',
		width: 150,
	},
	{
		field: 'leaveType',
		headerName: 'Leave Type',
		width: 150,
	},
	{
		field: 'approved',
		headerName: 'Approved',
		type: 'boolean',
		width: 150,
	},
	{
		field: 'teamName',
		headerName: 'Team',
		width: 150,
	},
];
