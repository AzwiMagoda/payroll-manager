import { Avatar, Box, Card, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useStore } from '../../../app/stores/store';
import RemunerationChart from './RemunerationChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { Remuneration as RemunerationDto } from '../../../app/models/remuneration';
import RemunerationItem from './RemunerationItem';
import { observer } from 'mobx-react-lite';
import { RemunerationGraph } from '../../../app/models/remunerationGraph';

interface Props {
	remuneration: number[];
}
export default observer(function Remuneration({ remuneration }: Props) {
	const items = [
		{
			label: 'Base Salary',
			amount: remuneration[0],
			color: '#3F51B5',
			icon: <AttachMoneyIcon sx={{ fontSize: 40, bgcolor: '#4B5563' }} />,
		},
		{
			label: 'Bonus',
			amount: remuneration[1],
			color: '#e53935',
			icon: <CardGiftcardIcon sx={{ fontSize: 40, bgcolor: '#4B5563' }} />,
		},
		{
			label: 'Overtime',
			amount: remuneration[2],
			color: '#FB8C00',
			icon: <AttachMoneyIcon sx={{ fontSize: 40, bgcolor: '#4B5563' }} />,
		},
	];

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={5}>
					{items.map((item, index) => (
						<RemunerationItem
							key={index}
							label={item.label}
							amount={item.amount}
							icon={item.icon}
							color={item.color}
						/>
					))}
				</Grid>
				<Grid item xs={7}>
					<Card>
						<RemunerationChart items={items} />
					</Card>
				</Grid>
			</Grid>
		</>
	);
});
