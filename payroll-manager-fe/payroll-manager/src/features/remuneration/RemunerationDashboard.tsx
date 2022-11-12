import {
	Box,
	Card,
	CardContent,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../app/stores/store';
import Remuneration from './remunerationHome/Remuneration';

export default observer(function RemunerationDashboard() {
	const options = ['Annual', 'Monthly', 'Hourly'];
	const [activeMenu, setActiveMenu] = useState(0);
	const [option, setOption] = useState(options[0]);
	const [amountArray, setAmountArray] = useState<number[]>([]);

	const {
		remunerationStore: {
			loading,
			getRemuneration,
			remuneration,
			getRemunerationGraphData,
			remunerationGraphData,
		},
	} = useStore();

	useEffect(() => {
		getRemuneration();
		getRemunerationGraphData();

		if (remunerationGraphData)
			setAmountArray([
				remunerationGraphData.annualBaseSalary,
				remunerationGraphData.annualBonus,
				remunerationGraphData.annualOvertimePay,
			]);
	});

	const onChange = (newOption: string) => {
		setOption(newOption);

		if (remunerationGraphData) {
			if (newOption == options[0]) {
				setAmountArray([
					remunerationGraphData.annualBaseSalary,
					remunerationGraphData.annualBonus,
					remunerationGraphData.annualOvertimePay,
				]);
			} else if (newOption == options[1]) {
				setAmountArray([
					remunerationGraphData.monthlyBaseSalary,
					remunerationGraphData.monthlyBonus,
					remunerationGraphData.monthlyOvertimePay,
				]);
			} else {
				setAmountArray([
					remunerationGraphData.dailyBaseSalary,
					remunerationGraphData.dailyBonus,
					remunerationGraphData.dailyOvertimePay,
				]);
			}
		}
	};

	return (
		<Container maxWidth={false}>
			<Tabs
				value={activeMenu}
				onChange={(event: any, value: any) => setActiveMenu(value)}
				aria-label='profile detail tabs'
			>
				<Tab label='Remuneration'></Tab>
				<Tab label='Benefits'></Tab>
				<Tab label='Deductions'></Tab>
			</Tabs>

			<Box sx={{ mt: 3 }}>
				<Card>
					{activeMenu === 0 && (
						<CardContent>
							<Stack
								direction='row'
								justifyContent='flex-end'
								alignItems='center'
								spacing={4}
							>
								<Typography variant='body2'>
									Remuneration values for:
								</Typography>
								<FormControl margin='normal'>
									<InputLabel id='lblLeaveType'>Period</InputLabel>
									<Select
										labelId='lblLeaveType'
										id='leaveType'
										value={option}
										label='Leave Type'
										onChange={(e) => onChange(e.target.value)}
									>
										{options.map((o, i) => (
											<MenuItem key={i} value={o}>
												{o}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Stack>
						</CardContent>
					)}
				</Card>
			</Box>

			<Box sx={{ mt: 3 }}>
				{activeMenu === 0 && remunerationGraphData && (
					<Remuneration remuneration={amountArray} />
				)}
			</Box>
		</Container>
	);
});
