import { Box, useTheme } from '@mui/material';
import { ChartData } from 'chart.js';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Remuneration } from '../../../app/models/remuneration';
import { observer } from 'mobx-react-lite';

interface Props {
	items: any[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default observer(function RemunerationChart({ items }: Props) {
	const theme = useTheme();

	const data: ChartData<'doughnut'> = {
		labels: items.map((item) => item.label),
		datasets: [
			{
				label: 'Amount',
				data: items.map((item) => item.amount),
				backgroundColor: items.map((item) => item.color),
				borderWidth: 8,
				borderColor: '#FFFFFF',
				hoverBorderColor: '#FFFFFF',
			},
		],
	};

	const options = {
		cutoutPercentage: 80,
		layout: { padding: 20 },
		legend: {
			display: true,
		},
		maintainAspectRatio: false,
		responsive: true,
		tooltips: {
			backgroundColor: theme.palette.background.paper,
			bodyFontColor: theme.palette.text.secondary,
			borderColor: theme.palette.divider,
			borderWidth: 1,
			enabled: true,
			footerFontColor: theme.palette.text.secondary,
			intersect: false,
			mode: 'index',
			titleFontColor: theme.palette.text.primary,
		},
	};
	return (
		<Box
			sx={{
				height: 400,
				position: 'relative',
			}}
		>
			<Doughnut data={data} options={options} />
		</Box>
	);
});
