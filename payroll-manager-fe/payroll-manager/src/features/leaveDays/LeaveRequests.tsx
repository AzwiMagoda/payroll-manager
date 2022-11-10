import {
	Card,
	Box,
	Chip,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
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
import { BookedLeaveDays } from '../../app/models/bookedLeaveDays';
import { DeclineLeave } from '../../app/models/DeclineLeave';

interface Props {
	setSelectedIds: (params: any) => any;
}
export default observer(function LeaveRequests({ setSelectedIds }: Props) {
	const reasons = [
		'Inability to cover work with existing staff',
		'Inability to hire additional staff',
		'Negative effect on ability to meet customer demand',
		'Negative impact on company performance',
	];

	const [reason, setReason] = useState(reasons[0]);
	const [open, setOpen] = React.useState(false);
	const [id, setId] = React.useState('');
	const {
		employeeStore: {
			employeeLeaveDays,
			getEmployeeBookedLeaveDays,
			declineLeave,
		},
	} = useStore();
	const [pageSize, setPageSize] = React.useState(5);

	useEffect(() => {
		getEmployeeBookedLeaveDays();
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onDeclineClick = (e: any) => {
		setId(e.id);

		handleClickOpen();
	};

	const onSubmit = async () => {
		await declineLeave({ id, reason } as DeclineLeave);
	};

	const columns: GridColDef[] = [
		{
			field: 'name',
			flex: 1,
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
			renderCell: (params: any) => {
				return (
					<strong>
						<Button
							startIcon={<CloseIcon fontSize='small' />}
							sx={{ mr: 1 }}
							onClick={() => onDeclineClick(params)}
						>
							Decline
						</Button>
					</strong>
				);
			},
		},
		{
			field: 'reason',
			flex: 2,
			headerName: 'Reason',
		},
	];

	return (
		<Card>
			<Box sx={{ width: '100%', display: 'flex' }}>
				{employeeLeaveDays && (
					<>
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
						<Dialog open={open} onClose={handleClose}>
							<DialogTitle>Kindly Provide a Reason</DialogTitle>
							<DialogContent>
								<DialogContentText>
									Kindly provide a reason for declining the leave
								</DialogContentText>

								<FormControl fullWidth margin='normal'>
									<InputLabel id='lblLeaveType'>Leave Type</InputLabel>
									<Select
										labelId='lblLeaveType'
										id='leaveType'
										value={reason}
										label='Leave Type'
										onChange={(e) => setReason(e.target.value)}
									>
										{reasons.map((r, i) => (
											<MenuItem key={i} value={r}>
												{r}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => onSubmit()}>Submit</Button>
								<Button onClick={handleClose}>Close</Button>
							</DialogActions>
						</Dialog>
					</>
				)}
			</Box>
		</Card>
	);
});
