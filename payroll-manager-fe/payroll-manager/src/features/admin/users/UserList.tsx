import { Chip, Button, Card } from '@mui/material';
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
import { UserDetails } from '../../../app/models/userDetails';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

// interface Props {
// 	users: UserDetails[];
// }

export default observer(function UserList() {
	const {
		authStore: { getUserList, users },
	} = useStore();

	useEffect(() => {
		getUserList();
	}, [getUserList]);

	let navigate = useNavigate();

	const columns: GridColDef[] = [
		{
			field: 'userName',
			flex: 1,
			headerName: 'Username',
		},
		{
			field: 'email',
			flex: 1,
			headerName: 'Email',
		},
		{
			field: 'phoneNumber',
			flex: 1,
			headerName: 'Phone Number',
		},
		{
			field: 'role',
			flex: 1,
			headerName: 'Role',
		},
		{
			field: 'hasEmployeeProfile',
			flex: 1,
			headerName: 'EmployeeProfile',
			type: 'boolean',
		},
		{
			field: 'isActive',
			headerName: 'Status',
			flex: 1,
			headerAlign: 'center',
			align: 'center',
			renderCell: (params: GridRenderCellParams<Boolean>) => {
				return (
					<strong>
						{params.value === true ? (
							<Chip label={'Active'} color='success' size='small' />
						) : (
							<Chip label={'Inactive'} color='error' size='small' />
						)}
					</strong>
				);
			},
		},
		{
			field: 'actions',
			type: 'actions',
			flex: 1,
			renderCell: (params: any) => {
				return (
					<strong>
						<Button
							startIcon={<EditIcon fontSize='small' />}
							sx={{ mr: 1 }}
							onClick={() => onEditCLick(params.row)}
						>
							Edit User
						</Button>
					</strong>
				);
			},
		},
	];

	const onEditCLick = (params: any) => {
		navigate(`/employee/${params.id}`);
	};

	return (
		<Card>
			<DataGrid
				autoHeight
				rows={users}
				columns={columns}
				pageSize={20}
				disableSelectionOnClick
				disableColumnMenu
				experimentalFeatures={{ newEditingApi: true }}
				components={{ Toolbar: GridToolbar }}
			/>
		</Card>
	);
});
