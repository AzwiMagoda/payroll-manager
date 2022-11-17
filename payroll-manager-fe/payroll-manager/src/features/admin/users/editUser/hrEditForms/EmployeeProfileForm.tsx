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
	user: UserDetails;
}

export default observer(function EmployeeProfileForm({ user }: Props) {
	let initial: Employee = {
		name: user.firstName,
		surname: user.lastName,
		jobTitle: '',
	};

	const {
		generalStore: {
			managerList,
			departmentList,
			titleList,
			getTeamListDepartment,
		},
		employeeStore: { updateEmployee },
	} = useStore();

	const [employee, setEmployee] = useState<Employee>(initial);
	const [department, setDepartment] = useState(departmentList[0].id);
	const [manager, setManager] = useState(managerList[0].id);
	const [team, setTeam] = useState('');
	const [teamList, setTeamList] = useState<ListDto[]>([]);
	const [title, setTitle] = useState(0);

	const textFields = [
		{
			id: 'name',
			value: employee.name,
			label: 'First Name',
		},
		{
			id: 'surname',
			value: employee.surname,
			label: 'Last Name',
		},
		{
			id: 'jobTitle',
			value: employee.jobTitle,
			label: 'Job Title',
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

	const onChange = (id: string, value: string) => {
		console.log(employee);

		switch (id) {
			case 'name':
				initial.name = value;
				break;
			case 'surname':
				initial.surname = value;
				break;
			case 'jobTitle':
				initial.jobTitle = value;
				break;
		}

		setEmployee(initial);
	};

	const getTeamList = async (value: string) => {
		var list = await getTeamListDepartment(value);
		if (list) setTeamList(list);
	};

	const onSaveClick = async () => {
		initial.department = departmentList.find((x) => x.id === department)!.name;
		initial.manager = managerList.find((x) => x.id === manager)!.name;
		initial.managerEmployeeId = manager;
		initial.teamName = teamList.find((x) => x.id === team)!.name;
		initial.teamId = team;
		initial.id = user.id;
		initial.title = titleList[title];

		console.log(initial);
		await updateEmployee(initial);
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
								) => onChange(e.target.id, e.target.value)}
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
