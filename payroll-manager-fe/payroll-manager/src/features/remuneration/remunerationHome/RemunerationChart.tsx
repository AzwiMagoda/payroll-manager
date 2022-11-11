import { Box, useTheme } from '@mui/material';
import { ChartData } from 'chart.js';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Remuneration } from '../../../app/models/remuneration';

interface Props {
	remuneration: Remuneration;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RemunerationChart({ remuneration }: Props) {
	const theme = useTheme();

	const data: ChartData<'doughnut'> = {
		labels: ['Base Pay', 'Bonus', 'Overtime'],
		datasets: [
			{
				label: 'Amount',
				data: [
					// remuneration.annualBaseSalary,
					// remuneration.bonusPercentage,
					// remuneration.overtimeHrs,
					240000, 25000, 10000,
				],
				backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
				borderWidth: 8,
				borderColor: '#FFFFFF',
				hoverBorderColor: '#FFFFFF',
			},
		],
	};

	const options = {
		// animation: false,
		cutoutPercentage: 80,
		layout: { padding: 0 },
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
}
