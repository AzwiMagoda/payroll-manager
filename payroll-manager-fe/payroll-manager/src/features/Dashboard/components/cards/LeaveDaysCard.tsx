import { observer } from 'mobx-react-lite';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Typography,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
	leaveBalance: number;
}

export default observer(function LeaveDaysCard({ leaveBalance }: Props) {
	return (
		<Card>
			<CardContent>You have no upcoming leave days</CardContent>
		</Card>
	);
});
