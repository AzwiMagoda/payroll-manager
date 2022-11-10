import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {
	Box,
	Button,
	Card,
	CardHeader,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	CircularProgress,
	Stack,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Link } from 'react-router-dom';
import { Payslip } from '../../../../app/models/payslip';
import { useStore } from '../../../../app/stores/store';

export default observer(function PayslipList() {
	const {
		payslipStore: { getAllPayslips, payslips, loading },
	} = useStore();

	useEffect(() => {
		getAllPayslips();
	}, [getAllPayslips]);

	return (
		<Card>
			<CardHeader title='Payslips' />
			<Divider />
			{loading ? (
				<Stack alignItems='center' spacing={5}>
					<CircularProgress />
				</Stack>
			) : (
				payslips && (
					<List>
						{payslips.map((payslip, i) => (
							<ListItem
								component='a'
								href={payslip.downloadUrl}
								divider={i < payslips.length - 1}
								key={payslip.id}
							>
								<ListItemAvatar>
									<FileDownloadIcon />
								</ListItemAvatar>
								<ListItemText
									primary={payslip.payslipName}
									secondary={`Created ${payslip.createdDate}`}
								/>
							</ListItem>
						))}
					</List>
				)
			)}
			<Divider />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					p: 2,
				}}
			>
				<Link to='/payslips'>
					<Button
						color='primary'
						endIcon={<ArrowRightIcon />}
						size='small'
						variant='text'
					>
						View all
					</Button>
				</Link>
			</Box>
		</Card>
	);
});
