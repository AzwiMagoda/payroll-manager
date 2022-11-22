import { Box, Card, CardContent } from '@mui/material';
import React from 'react';
import { TeamMembers } from '../../../app/models/teamMembers';

interface Props {
	teamList: any[];
}

export default function TeamList({ teamList }: Props) {
	return (
		<>
			{teamList.map((item, index) => (
				<Box sx={{ mt: 1 }} key={index}>
					<Card sx={{ borderLeft: `10px solid ${item.color}` }}>
						<CardContent sx={{ padding: 3 }}>
							{item.name} {item.surname}
						</CardContent>
					</Card>
				</Box>
			))}
		</>
	);
}
