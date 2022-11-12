import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Employee } from '../../app/models/employee';
import { Link, NavLink } from 'react-router-dom';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Typography,
	CircularProgress,
	Stack,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useStore } from '../../app/stores/store';
import TeamList from './components/team/TeamList';
import LeaveDaysCard from './components/cards/LeaveDaysCard';
import ManagerCard from './components/cards/ManagerCard';
import PayslipCard from './components/cards/PayslipCard';
import PayslipList from './components/payslip/PayslipList';
import Details from './components/cards/Details';
import ManagerDetails from './components/cards/ManagerTeamDetails';

interface Props {
	employee: Employee;
}

export default observer(function EmployeeDashboard({ employee }: Props) {
	return (
		<Container maxWidth={false}>
			<Grid container spacing={3}>
				<Grid item lg={8} md={12} xl={9} xs={12}>
					<ManagerDetails employee={employee} />
				</Grid>
				<Grid item lg={4} md={6} xl={3} xs={12}>
					<LeaveDaysCard leaveBalance={0} />
				</Grid>
				<Grid item lg={8} md={12} xl={9} xs={12}>
					<Details employee={employee} />
				</Grid>
			</Grid>
		</Container>
	);
});
