import { Avatar, Box, Card, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

interface Props {
	label: string;
	amount: number;
	icon: any;
	color: string;
}

export default observer(function RemunerationItem({
	label,
	amount,
	icon,
	color,
}: Props) {
	return (
		<Box sx={{ mt: 3 }}>
			<Card sx={{ borderLeft: `15px solid ${color}`, padding: 3 }}>
				<Stack
					direction='row'
					justifyContent='space-around'
					alignItems='center'
					spacing={4}
				>
					<Avatar src='/static/images/avatars/avatar_1.png'>{icon}</Avatar>
					<Typography component='div' variant='h6'>
						{label}
					</Typography>
					<Typography component='div' variant='body1' sx={{ color: color }}>
						{`R ${amount}`}
					</Typography>
				</Stack>
			</Card>
		</Box>
	);
});
