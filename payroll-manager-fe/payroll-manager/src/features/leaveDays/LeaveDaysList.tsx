import { Box, Card, Chip } from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridToolbar,
	GridValueFormatterParams,
} from '@mui/x-data-grid';
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useStore } from '../../app/stores/store';

export default function LeaveDaysList() {
	const {
		employeeStore: { bookedLeaveDays, getAllBookedLeaveDays },
	} = useStore();
	const [pageSize, setPageSize] = React.useState(5);

	useEffect(() => {
		getAllBookedLeaveDays();
	}, []);

	const columns: GridColDef[] = [
		{
			field: 'startDate',
			headerName: 'Start Date',
			flex: 1,
			type: 'date',
			valueFormatter: (params: GridValueFormatterParams<string>) => {
				return format(new Date(params.value), 'dd-MM-yyyy');
			},
		},
		{
			field: 'endDate',
			headerName: 'End Date',
			flex: 1,
			type: 'date',
			valueFormatter: (params: GridValueFormatterParams<string>) => {
				return format(new Date(params.value), 'dd-MM-yyyy');
			},
		},
		{
			field: 'leaveType',
			headerName: 'Leave Type',
			flex: 1,
		},
		{
			field: 'status',
			headerName: 'Status',
			flex: 1,
			renderCell: (params: GridRenderCellParams<String>) => {
				return (
					<strong>
						{params.value === 'Declined' ? (
							<Chip label={params.value} color='error' size='small' />
						) : params.value === 'Approved' ? (
							<Chip label={params.value} color='success' size='small' />
						) : (
							<Chip label={params.value} color='warning' size='small' />
						)}
					</strong>
				);
			},
		},
		{
			field: 'reason',
			flex: 2,
			headerName: 'Reason',
		},
		{
			field: 'createdDate',
			headerName: 'Date Requested',
			flex: 1,
			type: 'date',
			valueFormatter: (params: GridValueFormatterParams<string>) => {
				return format(new Date(params.value), 'dd-MM-yyyy');
			},
		},
	];

	return (
		<Card>
			<Box sx={{ width: '100%', display: 'flex' }}>
				{bookedLeaveDays && (
					<DataGrid
						autoHeight
						rows={bookedLeaveDays}
						columns={columns}
						pageSize={pageSize}
						onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
						rowsPerPageOptions={[5, 10, 20]}
						disableSelectionOnClick
						disableColumnMenu
						experimentalFeatures={{ newEditingApi: true }}
						components={{ Toolbar: GridToolbar }}
					/>
				)}
			</Box>
		</Card>
	);
}
