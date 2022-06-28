import React from 'react';
import { observer } from 'mobx-react-lite';
import PeoplesIcon from '@rsuite/icons/Peoples';
import { Col, Container, Content, FlexboxGrid, Header } from 'rsuite';
import { Employee } from '../../app/models/employee';

import { Link } from 'react-router-dom';

interface Props {
	employee: Employee;
}

export default observer(function EmployeeDashboard({ employee }: Props) {
	return (
		<Container>
			<Header>
				<h3>Welcome, {employee.name}!</h3>
			</Header>
			<Content>
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
			</Content>
		</Container>
	);
});
