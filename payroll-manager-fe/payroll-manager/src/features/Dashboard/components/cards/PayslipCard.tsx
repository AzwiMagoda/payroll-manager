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
import DownloadIcon from '@mui/icons-material/Download';
import React from 'react';
import { Link } from 'react-router-dom';
import { Payslip } from '../../../../app/models/payslip';

interface Props {
	latestPayslip: Payslip;
}

export default observer(function PayslipCard({ latestPayslip }: Props) {
	return (
		<Card sx={{ height: '100%' }}>
			<CardContent>
				<Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
					<Grid item>
						<Typography color='textSecondary' gutterBottom variant='overline'>
							Payslip
						</Typography>
						<Typography color='textPrimary' variant='h4'>
							Download Latest
						</Typography>
					</Grid>
					<Grid item>
						<Avatar
							sx={{
								backgroundColor: 'success.main',
								height: 56,
								width: 56,
							}}
						>
							<DownloadIcon />
						</Avatar>
					</Grid>
				</Grid>
				<Box
					sx={{
						pt: 2,
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<ArrowDownwardIcon color='success' />

					<Typography
						color='error'
						sx={{
							mr: 1,
						}}
						variant='body2'
					>
						<a
							href={latestPayslip.downloadUrl}
							target='_blank'
							rel='noreferrer'
						>
							<Button size='small'>Download</Button>
						</a>
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
});
