import { Card, Box, Chip, Button } from '@mui/material';
import React, { useEffect } from 'react';
import {
	DataGrid,
	GridActionsCellItem,
	GridColDef,
	GridRenderCellParams,
	GridRowParams,
	GridSelectionModel,
	GridToolbar,
	GridValueFormatterParams,
	GridValueGetterParams,
} from '@mui/x-data-grid';
import { useStore } from '../../app/stores/store';
import { format } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import { observer } from 'mobx-react-lite';

const columns: GridColDef[] = [
	{
		field: 'name',
		flex: 1.5,
		headerName: 'First name',
	},
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
		field: 'teamName',
		flex: 1,
		headerName: 'Team',
	},
	{
		field: 'actions',
		type: 'actions',
		flex: 1,
		renderCell: (params: GridRenderCellParams<Boolean>) => {
			return (
				<strong>
					<Button
						startIcon={<CloseIcon fontSize='small' />}
						sx={{ mr: 1 }}
						onClick={() => console.log(params)}
					>
						Decline
					</Button>
				</strong>
			);
		},
	},
];

interface Props {
	setSelectedIds: (params: any) => any;
}
export default observer(function LeaveRequests({ setSelectedIds }: Props) {
	const {
		employeeStore: { employeeLeaveDays, getEmployeeBookedLeaveDays },
	} = useStore();
	const [pageSize, setPageSize] = React.useState(5);

	useEffect(() => {
		getEmployeeBookedLeaveDays();
	}, []);

	return (
		<Card>
			<Box sx={{ width: '100%', display: 'flex' }}>
				{employeeLeaveDays && (
					<DataGrid
						autoHeight
						rows={employeeLeaveDays}
						columns={columns}
						checkboxSelection
						pageSize={pageSize}
						onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
						rowsPerPageOptions={[5, 10, 20]}
						disableSelectionOnClick
						disableColumnMenu
						experimentalFeatures={{ newEditingApi: true }}
						components={{ Toolbar: GridToolbar }}
						onSelectionModelChange={(rows) => setSelectedIds(rows)}
					/>
				)}
			</Box>
		</Card>
	);
});
