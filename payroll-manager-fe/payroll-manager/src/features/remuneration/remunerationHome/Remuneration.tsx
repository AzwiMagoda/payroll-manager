import { Card, Grid, useTheme } from '@mui/material';
import RemunerationChart from './RemunerationChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import RemunerationItem from './RemunerationItem';
import { observer } from 'mobx-react-lite';

interface Props {
	remuneration: number[];
}
export default observer(function Remuneration({ remuneration }: Props) {
	const theme = useTheme();
	const items = [
		{
			label: 'Base Salary',
			amount: remuneration[0],
			color: theme.palette.primary.light,
			icon: <AttachMoneyIcon sx={{ fontSize: 40, bgcolor: '#4B5563' }} />,
		},
		{
			label: 'Bonus',
			amount: remuneration[1],
			color: theme.palette.secondary.light,
			icon: <CardGiftcardIcon sx={{ fontSize: 40, bgcolor: '#4B5563' }} />,
		},
		{
			label: 'Overtime',
			amount: remuneration[2],
			color: theme.palette.warning.main,
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
