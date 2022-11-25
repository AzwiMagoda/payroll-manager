import { Box, Button, Card, Chip, Tooltip } from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridToolbar,
	GridValueFormatterParams,
} from '@mui/x-data-grid';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '../../app/stores/store';
import DeleteIcon from '@mui/icons-material/Delete';

export default observer(function BookedLeaveDaysList() {
	const {
		employeeStore: { bookedLeaveDays, getAllBookedLeaveDays, deleteLeave },
	} = useStore();
	const [pageSize, setPageSize] = React.useState(5);

	useEffect(() => {
		getAllBookedLeaveDays();
	}, []);

	const onCancelClick = async (id: string) => {
		await deleteLeave(id);
	};

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
		{
			field: 'actions',
			type: 'actions',
			flex: 0.5,
			renderCell: (params: any) => {
				return (
					<strong>
						<Button
							startIcon={<DeleteIcon fontSize='small' />}
							sx={{ mr: 1 }}
							disabled={params.row.status === 'Declined'}
							onClick={() => onCancelClick(params.id)}
							color='error'
						></Button>
					</strong>
				);
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
});
