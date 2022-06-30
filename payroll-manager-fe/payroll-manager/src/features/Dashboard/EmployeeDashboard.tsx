import React from 'react';
import { observer } from 'mobx-react-lite';
import { Employee } from '../../app/models/employee';
import { Link } from 'react-router-dom';
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
	Typography,
} from '@mui/material';
import GridCard from './components/GridCard';
import WorkIcon from '@mui/icons-material/Work';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface Props {
	employee: Employee;
}

export default observer(function EmployeeDashboard({ employee }: Props) {
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
					sx={{ marginBottom: '2rem' }}
				>
					<GridCard
						size={3}
						details={'14'}
						heading={'Annual Leave Days'}
						linkText={'View Balances'}
					/>
					<GridCard
						size={3}
						details={'Jenny Smith'}
						heading={'Your Manager'}
						linkText={'View Details'}
					/>
					<GridCard
						size={3}
						details={'Download Latest'}
						heading={'Payslips'}
						linkText={'Download'}
					/>
				</Grid>

				<Grid
					container
					spacing={12}
					direction='row'
					justifyContent='center'
					alignItems='stretch'
				>
					<Grid item xs>
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
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<WorkIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText primary='My Details' />
									</ListItem>
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
					</Grid>
					<Grid item xs>
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
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<FileDownloadIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText primary='Payslip4.pdf' />
									</ListItem>
								</List>
							</CardContent>
							<CardActions>
								<Button size='small'>View All</Button>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs>
						<Card variant='outlined'>
							<CardContent>
								<Typography
									sx={{ fontSize: 14 }}
									color='text.secondary'
									gutterBottom
								>
									My Team
								</Typography>
								<List>
									<ListItem>
										<ListItemAvatar>
											<Avatar>J</Avatar>
										</ListItemAvatar>
										<ListItemText primary='John Smith' secondary='Engineer' />
									</ListItem>
									<Divider variant='inset' component='li' />
									<ListItem>
										<ListItemAvatar>
											<Avatar>M</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary='Martha Stewart'
											secondary='Team lead'
										/>
									</ListItem>
									<Divider variant='inset' component='li' />
									<ListItem>
										<ListItemAvatar>
											<Avatar>K</Avatar>
										</ListItemAvatar>
										<ListItemText primary='Kola Nut' secondary='Scrum Master' />
									</ListItem>
									<Divider variant='inset' component='li' />
									<ListItem>
										<ListItemAvatar>
											<Avatar>P</Avatar>
										</ListItemAvatar>
										<ListItemText primary='Pola Beara' secondary='Engineer' />
									</ListItem>
									<Divider variant='inset' component='li' />
								</List>
							</CardContent>
							<CardActions>
								<Button size='small'>View All</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Box>

			{/* <Content>
				<div className='show-grid'>
					<FlexboxGrid justify='space-around' align='top'>
						<FlexboxGrid.Item as={Col} colspan={7}>
							<Header>
								<h5>My Details</h5>
							</Header>
							<Content>
								<div>
									<Link to='/profile'> Profile</Link>
								</div>
								<div>
									<Link to='/remuneration'> Remuneration</Link>
								</div>
							</Content>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item as={Col} colspan={7}>
							<Header>
								<h5>
									<PeoplesIcon />
									My Team
								</h5>
							</Header>
							<Content>
								<div>
									<Link to='/team'> View Team</Link>
								</div>
								<div>
									<Link to='/team/manager'>View Manager</Link>
								</div>
							</Content>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item as={Col} colspan={7}>
							<Header>
								<h5>Leave</h5>
							</Header>
							<Content>
								<div>
									<Link to='/leave/request'> Request Leave</Link>
								</div>
								<div>
									<Link to='/leave/balance'> View Leave Balance</Link>
								</div>
							</Content>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item as={Col} colspan={7} smHidden>
							<Header>
								<h5>Benefits</h5>
							</Header>
							<Content>hey</Content>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item as={Col} colspan={7} smHidden>
							<Header>
								<h5>Payslips</h5>
							</Header>
							<Content>hey</Content>
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</div>
			</Content> */}
		</Box>
	);
});
