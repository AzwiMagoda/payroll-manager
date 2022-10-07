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
	Avatar,
} from '@mui/material';
import React, { useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useStore } from '../../../../app/stores/store';
import { Link } from 'react-router-dom';

interface Props {
	teamName: string;
}

export default function TeamList({ teamName }: Props) {
	const {
		teamStore: { getAllTeamMembers, teamMembers, loading },
	} = useStore();

	useEffect(() => {
		getAllTeamMembers(teamName);
	}, [getAllTeamMembers, teamMembers, teamName]);
	return (
		<Card>
			<CardHeader title='Payslips' />
			<Divider />
			<List>
				{teamMembers &&
					teamMembers.map((member) => (
						<List key={member.lastName}>
							<ListItem>
								<ListItemAvatar>
									<Avatar
										alt={`${member.firstName} ${member.lastName}`}
										src='/static/images/avatar/2.jpg'
									/>
								</ListItemAvatar>
								<ListItemText
									primary={`${member.firstName} ${member.lastName}`}
									secondary={member.jobTitle}
								/>
								<IconButton edge='end' size='small'>
									<MoreVertIcon />
								</IconButton>
							</ListItem>
							<Divider variant='inset' component='li' />
						</List>
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
				<Link to='/teamDetails'>
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
}
