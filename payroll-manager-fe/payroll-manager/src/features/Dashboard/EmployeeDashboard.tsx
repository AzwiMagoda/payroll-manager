import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Employee } from '../../app/models/employee';
import { Link, NavLink } from 'react-router-dom';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material';
import GridCard from './components/GridCard';
import WorkIcon from '@mui/icons-material/Work';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useStore } from '../../app/stores/store';
import TeamList from './TeamList/TeamList';

interface Props {
	employee: Employee;
}

export default observer(function EmployeeDashboard({ employee }: Props) {
	const {
		employeeStore: { leaveDays, getAllBookedLeaveDays, getLeaveDaysBalances },
		payslipStore: { getAllPayslips, getlatestPayslip, loading, latestPayslip },
	} = useStore();

	useEffect(() => {
		getLeaveDaysBalances(employee.id);
		getAllBookedLeaveDays(employee.id);
		getAllPayslips(employee.id);
		getlatestPayslip(employee.id);
	}, [employee.id, getAllBookedLeaveDays, getAllPayslips, getLeaveDaysBalances, getlatestPayslip]);

	return (
		<Box>
			<Typography align='center' variant='h5'>
				Welcome back, {employee.name}
			</Typography>

			<Box sx={{ padding: '2rem 4rem' }}>
				<Grid
					container
					spacing={12}
					direction='row'
					justifyContent='center'
					alignItems='stretch'
					sx={{ marginBottom: '4rem' }}
				>
					{leaveDays ? (
						<GridCard
							size={3}
							details={leaveDays.annualLeaveBalance}
							heading={'Annual Leave Days'}
							linkText={'View Balances'}
							path='/leaveDashboard'
						/>
					) : (
						<GridCard
							size={3}
							details={'Loading...'}
							heading={'Annual Leave Days'}
							linkText={'View Balances'}
							path='/leaveDashboard'
						/>
					)}

					<GridCard
						size={3}
						details={employee.manager}
						heading={'Your Manager'}
						linkText={'View Details'}
						path='teamDetails/manager'
					/>

					{latestPayslip ? (
						<GridCard
							size={3}
							details={'Download Latest'}
							heading={'Payslips'}
							linkText={'Download'}
							path=''
							download={latestPayslip.downloadUrl}
						/>
					) : (
						<GridCard
							size={3}
							details={'Download Latest'}
							heading={'Payslips'}
							linkText={'Download'}
							path=''
						/>
					)}
				</Grid>

				<Grid
					container
					spacing={12}
					direction='row'
					justifyContent='center'
					alignItems='stretch'
				>
					<Grid item xs>
						<Paper elevation={1}>
							<Card variant='outlined'>
								<CardContent>
									<Typography
										sx={{ fontSize: 14 }}
										color='text.secondary'
										gutterBottom
									>
										My Profile
									</Typography>
									<List>
										<NavLink to='/profile'>
											<ListItem>
												<ListItemAvatar>
													<Avatar>
														<WorkIcon />
													</Avatar>
												</ListItemAvatar>
												<ListItemText primary='My Details' />
											</ListItem>
										</NavLink>
										<ListItem>
											<ListItemAvatar>
												<Avatar>
													<WorkIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary='Remuneration' />
										</ListItem>
										<ListItem>
											<ListItemAvatar>
												<Avatar>
													<WorkIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary='Beneficiaries' />
										</ListItem>
									</List>
								</CardContent>
							</Card>
						</Paper>
					</Grid>
					<Grid item xs>
						<Paper elevation={1}>
							<Card variant='outlined'>
								<CardContent>
									<Typography
										sx={{ fontSize: 14 }}
										color='text.secondary'
										gutterBottom
									>
										My Payslips
									</Typography>
									<List>
										<ListItem>
											<ListItemAvatar>
												<Avatar>
													<FileDownloadIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary='Payslip1.pdf' />
										</ListItem>
										<ListItem>
											<ListItemAvatar>
												<Avatar>
													<FileDownloadIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary='Payslip2.pdf' />
										</ListItem>
										<ListItem>
											<ListItemAvatar>
												<Avatar>
													<FileDownloadIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary='Payslip3.pdf' />
										</ListItem>
									</List>
								</CardContent>
								<CardActions>
									<Button size='small'>View All</Button>
								</CardActions>
							</Card>
						</Paper>
					</Grid>
					<Grid item xs>
						<Paper elevation={1}>
							<Card variant='outlined'>
								<CardContent>
									<Typography
										sx={{ fontSize: 14 }}
										color='text.secondary'
										gutterBottom
									>
										My Team
									</Typography>
									<TeamList teamName={employee.teamName} />
								</CardContent>
								<CardActions>
									<Button size='small'>View All</Button>
								</CardActions>
							</Card>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
});
