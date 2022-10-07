import { observer } from 'mobx-react-lite';
import React from 'react';
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
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Link } from 'react-router-dom';

const payslips = [
	{
		id: 1,
		name: 'Paylsip1',
		downloadUrl: 'https://www.linkedin.com/in/azwi-magoda/',
	},
	{
		id: 2,
		name: 'Paylsip2',
		downloadUrl: 'https://www.linkedin.com/in/azwi-magoda/',
	},
	{
		id: 3,
		name: 'Paylsip3',
		downloadUrl: 'https://www.linkedin.com/in/azwi-magoda/',
	},
];

export default observer(function PayslipList() {
	return (
		<Card>
			<CardHeader title='Payslips' />
			<Divider />
			<List>
				{payslips.map((payslip, i) => (
					<ListItem divider={i < payslips.length - 1} key={payslip.id}>
						<ListItemAvatar>
							<FileDownloadIcon />
						</ListItemAvatar>
						<ListItemText
							primary={payslip.name}
							secondary={`Created 25/09/2022`}
						/>
						<IconButton edge='end' size='small'>
							<MoreVertIcon />
						</IconButton>
					</ListItem>
				))}
			</List>
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
