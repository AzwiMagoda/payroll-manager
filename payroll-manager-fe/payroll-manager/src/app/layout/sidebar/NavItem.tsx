import React, { useEffect } from 'react';
import { Box, Button, ListItem } from '@mui/material';
import { Link, useMatch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Props {
	title?: string;
	icon?: any;
	href: string;
}

export default function NavItem({ title, icon, href }: Props) {
	const active = useMatch(href);
	const navigate = useNavigate();

	return (
		<ListItem
			disableGutters
			sx={{
				display: 'flex',
				mb: 0.5,
				py: 0,
				px: 2,
			}}
		>
			<Button
				href={href}
				component='a'
				startIcon={icon}
				disableRipple
				sx={{
					backgroundColor: active && 'rgba(255,255,255, 0.08)',
					borderRadius: 1,
					color: active ? 'secondary.main' : 'neutral.300',
					fontWeight: active && 'fontWeightBold',
					justifyContent: 'flex-start',
					px: 3,
					textAlign: 'left',
					textTransform: 'none',
					width: '100%',
					'& .MuiButton-startIcon': {
						color: active ? 'secondary.main' : 'neutral.400',
					},
					'&:hover': {
						backgroundColor: 'rgba(255,255,255, 0.08)',
					},
				}}
			>
				<Box sx={{ flexGrow: 1 }}>{title}</Box>
			</Button>
		</ListItem>
	);
}
