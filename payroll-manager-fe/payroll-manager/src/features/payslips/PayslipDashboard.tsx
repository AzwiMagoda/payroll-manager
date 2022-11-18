import { Box, Card, Container, Link } from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridValueFormatterParams,
} from '@mui/x-data-grid';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '../../app/stores/store';

export default observer(function PayslipDashboard() {
	useEffect(() => {
		document.title = 'Payslips | PayME';
	}, []);

	const {
		payslipStore: { getAllPayslips, payslips },
	} = useStore();
	const [pageSize, setPageSize] = React.useState(5);

	useEffect(() => {
		getAllPayslips();
	}, []);

	const columns: GridColDef[] = [
		{
			field: 'payslipName',
			headerName: 'Name',
			flex: 1,
			type: 'string',
		},
		{
			field: 'createdDate',
			headerName: 'Created Date',
			flex: 1,
			type: 'date',
			valueFormatter: (params: GridValueFormatterParams<string>) => {
				return format(new Date(params.value), 'dd-MM-yyyy');
			},
		},
		{
			field: 'downloadUrl',
			headerName: 'Link',
			flex: 1,
			renderCell: (params: GridRenderCellParams<string>) => {
				return (
					<strong>
						<Link underline='none' href={params.value} target='_blank'>
							Download
						</Link>
					</strong>
				);
			},
		},
	];

	return (
		<Container maxWidth={false}>
			<Card>
				<Box sx={{ width: '100%', display: 'flex' }}>
					{payslips && (
						<DataGrid
							autoHeight
							rows={payslips}
							columns={columns}
							pageSize={pageSize}
							onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
							rowsPerPageOptions={[5, 10, 20]}
							disableSelectionOnClick
							disableColumnMenu
							experimentalFeatures={{ newEditingApi: true }}
						/>
					)}
				</Box>
			</Card>
		</Container>
	);
});
