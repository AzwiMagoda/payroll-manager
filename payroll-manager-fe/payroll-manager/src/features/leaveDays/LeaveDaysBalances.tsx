import {
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { LeaveDays } from '../../app/models/leaveDays';

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
					<TableRow hover>
						<TableCell>Annual Leave</TableCell>
						<TableCell>{leaveDays.annualLeaveBalance}</TableCell>
						<TableCell>0</TableCell>
						<TableCell>Days</TableCell>
					</TableRow>
					<TableRow hover>
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
