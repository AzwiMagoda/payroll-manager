import {
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
import React, { useState } from 'react';
import { Employee } from '../../../../../app/models/employee';
import { ListDto } from '../../../../../app/models/listDto';
import { UserDetails } from '../../../../../app/models/userDetails';
import { useStore } from '../../../../../app/stores/store';

interface Props {
	user: UserDetails;
}

export default observer(function EmployeeProfileForm({ user }: Props) {
	let initial: Employee = {
		name: user.firstName,
		surname: user.lastName,
		cellphone: user.phoneNumber,
	};
	const departments = ['HR', 'Technology', 'Finance'];
	const titles = ['Mr', 'Miss', 'Mrs', 'Dr', 'Prof'];

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

	const onChange = (id: string, value: string) => {
		switch (id) {
			case 'name':
				initial.name = value;
				break;
		}

		setEmployee(initial);
	};

	const getTeamList = async (value: string) => {
		var list = await getTeamListDepartment(value);
		if (list) setTeamList(list);
	};

	const onDepartmentChange = (value: string) => {
		setDepartment(value);

		var departmentName = departmentList.find((x) => x.id === value)!.name;

		getTeamList(departmentName);
	};

	return (
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
					<FormControl fullWidth margin='normal'>
						<InputLabel id='lblDepartment'>Department</InputLabel>
						<Select
							labelId='lblDepartment'
							label='Departemnt'
							id='department'
							value={department}
							onChange={(e) => onDepartmentChange(e.target.value)}
						>
							{departmentList.map((department, i) => (
								<MenuItem key={i} value={department.id}>
									{department.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth margin='normal'>
						<InputLabel id='lblManager'>Manager</InputLabel>
						<Select
							labelId='lblManager'
							label='Manager'
							id='manager'
							value={manager}
							onChange={(e) => setManager(e.target.value)}
						>
							{managerList.map((manager, i) => (
								<MenuItem key={i} value={manager.id}>
									{manager.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth margin='normal'>
						<InputLabel id='lblTeam'>Team</InputLabel>
						<Select
							labelId='lblTeam'
							label='Team'
							id='team'
							value={team}
							onChange={(e) => setTeam(e.target.value)}
						>
							{teamList.map((team, i) => (
								<MenuItem key={i} value={team.id}>
									{team.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>
			</Grid>
		</Grid>
	);
});
