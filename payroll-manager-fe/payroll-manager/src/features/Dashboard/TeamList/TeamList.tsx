import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider,
	Box,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useStore } from '../../../app/stores/store';

interface Props {
	teamName: string;
}

export default function TeamList({ teamName }: Props) {
	const {
		teamStore: { getAllTeamMembers, teamMembers, loading },
	} = useStore();

	useEffect(() => {
		getAllTeamMembers(teamName);
		console.log(teamMembers);
	}, [getAllTeamMembers, teamMembers, teamName]);
	return (
		<Box>
			<List>
				{teamMembers &&
					teamMembers.map((member) => (
						<>
							<ListItem>
								<ListItemAvatar>
									<Avatar>{member.firstName.charAt(0)}</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={member.firstName}
									secondary={member.jobTitle}
								/>
							</ListItem>
							<Divider variant='inset' component='li' />
						</>
					))}
			</List>
		</Box>
	);
}
