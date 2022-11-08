import {
	Box,
	Card,
	CardContent,
	InputAdornment,
	Stack,
	SvgIcon,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { LeaveDays } from '../../app/models/leaveDays';
import { useStore } from '../../app/stores/store';

interface Props {
	leaveDays: LeaveDays;
}
export default observer(function LeaveDaysBalances({ leaveDays }: Props) {
	return (
		<Card>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Leave Type</TableCell>
						<TableCell>Balance</TableCell>
						<TableCell>Carryover</TableCell>
						<TableCell>Unit of Time</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow
						hover
						// selected={selectedCustomerIds.indexOf(customer.id) !== -1}
					>
						<TableCell>Annual Leave</TableCell>
						<TableCell>{leaveDays.annualLeaveBalance}</TableCell>
						<TableCell>0</TableCell>
						<TableCell>Days</TableCell>
					</TableRow>
					<TableRow
						hover
						// selected={selectedCustomerIds.indexOf(customer.id) !== -1}
					>
						<TableCell>Sick Leave</TableCell>
						<TableCell>{leaveDays.sickLeaveBalance}</TableCell>
						<TableCell>0</TableCell>
						<TableCell>Days</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell>Study Leave</TableCell>
						<TableCell>{leaveDays.studyLeaveBalance}</TableCell>
						<TableCell>0</TableCell>
						<TableCell>Days</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Card>
	);
});
