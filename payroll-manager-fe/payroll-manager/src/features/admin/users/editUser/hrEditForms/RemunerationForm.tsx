import {
	Stack,
	Button,
	Checkbox,
	FormControlLabel,
	TextField,
	InputAdornment,
	FormControl,
	FormLabel,
	Radio,
	RadioGroup,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import FormBase from '../../../../../app/common/form/FormBase';
import {
	createRemuneration,
	updateRemuneration,
} from '../../../../../app/functions/employeeFunctions';
import { useStore } from '../../../../../app/stores/store';
import { Remuneration } from '../../../../../app/models/remuneration';

interface Props {
	employeeId: string;
}
export default observer(function RemunerationForm({ employeeId }: Props) {
	const {
		employeeProfileStore: { remuneration, getRemuneration },
	} = useStore();

	const bonusPercentageList = [5, 10, 15, 20];
	const retirementPercentageList = [5, 7.5, 10, 15, 20, 25];

	const [annualSalary, setAnnualSalary] = useState(0);
	const [bonusPercentage, setBonusPercentage] = useState(
		bonusPercentageList[0]
	);
	const [bonusFrequency, setBonusFrequency] = useState(0);
	const [
		retirementContributionPercentage,
		setRetirementContributionPercentage,
	] = useState(retirementPercentageList[0]);

	const textFieldsLeft = [
		{
			id: 'annualSalary',
			value: annualSalary,
			label: 'Base Annual Salary',
			onChange: setAnnualSalary,
			startIcon: 'R',
		},
		{
			id: 'bonusFrequency',
			value: bonusFrequency,
			label: 'Bonus Frequency',
			onChange: setBonusFrequency,
		},
	];

	const left = [
		<>
			{textFieldsLeft.map((item, index) => (
				<TextField
					key={index}
					margin='normal'
					id={item.id}
					label={item.label}
					name={item.id}
					type='text'
					autoFocus
					autoComplete='off'
					fullWidth
					value={item.value}
					onChange={(
						e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
					) => item.onChange(e.target.value as unknown as number)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>{item.startIcon}</InputAdornment>
						),
					}}
				/>
			))}
		</>,
	];

	const right = [
		<FormControl color='warning' fullWidth margin='normal'>
			<InputLabel id='lblRetirementContributionPercentage'>
				Retirement Contribution Percentage
			</InputLabel>
			<Select
				labelId='lblRetirementContributionPercentage'
				label='Retirement Contribution Percentage'
				id='retirementContributionPercentage'
				value={retirementContributionPercentage}
				onChange={(e) =>
					setRetirementContributionPercentage(
						e.target.value as unknown as number
					)
				}
			>
				{retirementPercentageList.map((listItem, i) => (
					<MenuItem key={i} value={listItem}>
						{`${listItem}%`}
					</MenuItem>
				))}
			</Select>
		</FormControl>,
		<FormControl color='warning' margin='normal' fullWidth>
			<FormLabel id='lblBonusPercentage'>Bonus Percentage</FormLabel>
			<RadioGroup
				row
				aria-labelledby='bonusPercentage'
				name='bonusPercentage'
				value={bonusPercentage}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
					setBonusPercentage(event.target.value as unknown as number)
				}
			>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					spacing={4}
				>
					{bonusPercentageList.map((item, i) => (
						<FormControlLabel
							key={i}
							value={item}
							control={<Radio color='warning' />}
							label={`${item}%`}
						/>
					))}
				</Stack>
			</RadioGroup>
		</FormControl>,
	];

	useEffect(() => {
		getRemuneration(employeeId);
	}, [employeeId]);

	useEffect(() => {
		if (remuneration) {
			setBonusPercentage(
				remuneration.bonusPercentage || bonusPercentageList[0]
			);
			setAnnualSalary(remuneration.annualBaseSalary || 0);
			setBonusFrequency(remuneration.bonusFrequency || 1);
			setRetirementContributionPercentage(
				remuneration.retirementContributionPercentage ||
					retirementPercentageList[0]
			);
		}
	}, [remuneration]);

	const onSaveClick = async () => {
		let remunerationDto: Remuneration = {
			annualBaseSalary: annualSalary,
			bonusFrequency: bonusFrequency,
			bonusPercentage: bonusPercentage,
			retirementContributionPercentage: retirementContributionPercentage,
			employeeId: employeeId,
		};

		remuneration
			? updateRemuneration(remunerationDto)
			: createRemuneration(remunerationDto);
	};

	return (
		<>
			<FormBase leftComponents={left} rightComponents={right} />

			<Stack
				direction='row'
				justifyContent='flex-end'
				alignItems='center'
				spacing={4}
			>
				<Button
					startIcon={<SaveIcon fontSize='small' />}
					sx={{ mr: 1 }}
					onClick={() => onSaveClick()}
					color='warning'
					variant='contained'
				>
					Save Changes
				</Button>
			</Stack>
		</>
	);
});
