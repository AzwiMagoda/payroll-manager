import {
	Button,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Employee } from '../../../../../app/models/employee';
import { ListDto } from '../../../../../app/models/listDto';
import { UserDetails } from '../../../../../app/models/userDetails';
import { useStore } from '../../../../../app/stores/store';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
	employee: Employee;
}

export default observer(function EmployeeProfileForm({ employee }: Props) {
	const {
		generalStore: {
			managerList,
			departmentList,
			titleList,
			getTeamListDepartment,
		},
		employeeStore: { updateEmployee },
	} = useStore();

	const [name, setName] = useState(employee.name || '');
	const [surname, setSurname] = useState(employee.surname || '');
	const [jobTitle, setJobTitle] = useState(employee.jobTitle || '');

	const [department, setDepartment] = useState(
		departmentList.find((x) => x.name === employee.department)?.id ||
			departmentList[0].id
	);
	const [manager, setManager] = useState(
		employee.managerEmployeeId || managerList[0].id
	);
	const [team, setTeam] = useState(employee.teamId || '');
	const [teamList, setTeamList] = useState<ListDto[]>([]);
	const [title, setTitle] = useState(titleList.indexOf(employee.title!) || 0);

	const textFields = [
		{
			id: 'name',
			value: name,
			label: 'First Name',
			onChange: setName,
		},
		{
			id: 'surname',
			value: surname,
			label: 'Last Name',
			onChange: setSurname,
		},
		{
			id: 'jobTitle',
			value: jobTitle,
			label: 'Job Title',
			onChange: setJobTitle,
		},
	];

	const selects = [
		{
			label: 'Department',
			list: departmentList,
			id: 'department',
			value: department,
			onChange: setDepartment,
			labelId: 'lblDepartment',
		},
		{
			label: 'Manager',
			list: managerList,
			id: 'manager',
			value: manager,
			onChange: setManager,
			labelId: 'lblManager',
		},
		{
			label: 'Team',
			list: teamList,
			id: 'team',
			value: team,
			onChange: setTeam,
			labelId: 'lblTeam',
		},
	];

	useEffect(() => {
		var departmentName = departmentList.find((x) => x.id === department)!.name;

		getTeamList(departmentName);
	}, [department]);

	const getTeamList = async (value: string) => {
		var list = await getTeamListDepartment(value);
		if (list) setTeamList(list);
	};

	const onSaveClick = async () => {
		employee.department = departmentList.find((x) => x.id === department)!.name;
		employee.manager = managerList.find((x) => x.id === manager)!.name;
		employee.managerEmployeeId = manager;
		employee.teamName = teamList.find((x) => x.id === team)!.name;
		employee.teamId = team;
		employee.id = employee.id;
		employee.employeeId = employee.id;
		employee.title = titleList[title];
		employee.name = name;
		employee.surname = surname;
		employee.jobTitle = jobTitle;

		console.log(employee);
		await updateEmployee(employee);
	};

	return (
		<>
			<Grid
				container
				direction='row'
				justifyContent='space-around'
				alignItems='center'
			>
				<Grid item xs={4}>
					<Stack
						direction='column'
						justifyContent='flex-start'
						alignItems='center'
					>
						{textFields.map((item, index) => (
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
								) => item.onChange(e.target.value)}
							/>
						))}

						<FormControl fullWidth margin='normal'>
							<InputLabel id='lbltitle'>Title</InputLabel>
							<Select
								labelId='lbltitle'
								label='Title'
								id='title'
								value={title}
								onChange={(e) => setTitle(e.target.value as number)}
							>
								{titleList.map((title, i) => (
									<MenuItem key={i} value={i}>
										{title}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</Grid>

				<Divider
					sx={{
						borderColor: '#2D3748',
						mx: 3,
					}}
					orientation='vertical'
					variant='middle'
					flexItem
				/>

				<Grid item xs={4}>
					<Stack
						direction='column'
						justifyContent='flex-start'
						alignItems='center'
					>
						{selects.map((item, index) => (
							<FormControl fullWidth margin='normal' key={index}>
								<InputLabel id={item.labelId}>{item.label}</InputLabel>
								<Select
									labelId={item.labelId}
									label={item.label}
									id={item.id}
									value={item.value}
									onChange={(e) => item.onChange(e.target.value)}
								>
									{item.list.map((listItem, i) => (
										<MenuItem key={i} value={listItem.id}>
											{listItem.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						))}
					</Stack>
				</Grid>
			</Grid>

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
					color='primary'
					variant='contained'
				>
					Save Changes
				</Button>
			</Stack>
		</>
	);
});
