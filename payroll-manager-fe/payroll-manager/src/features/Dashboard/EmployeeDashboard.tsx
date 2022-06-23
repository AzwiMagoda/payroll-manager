/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import PeoplesIcon from '@rsuite/icons/Peoples';
import { Col, Container, Content, FlexboxGrid, Header } from 'rsuite';
import { Employee } from '../../app/models/employee';
import { useStore } from '../../app/stores/store';
import {
	containerStyle,
	flexContent,
	flexHeader,
	gridItem,
	headerStyle,
	linkStyle,
} from './styles';
import { Link } from 'react-router-dom';

interface Props {
	employee: Employee;
}

export default observer(function EmployeeDashboard({ employee }: Props) {
	return (
		<Container style={containerStyle}>
			<Header style={headerStyle}>
				<h3>Welcome, {employee.name}!</h3>
			</Header>
			<Content>
				<div className='show-grid'>
					<FlexboxGrid justify='space-around' align='top'>
						<FlexboxGrid.Item as={Col} colspan={7} style={gridItem}>
							<Header style={flexHeader}>
								<h5>My Details</h5>
							</Header>
							<Content style={flexContent}>
								<div style={linkStyle}>
									<Link to='/profile/edit'> Edit My Details</Link>
								</div>
								<div style={linkStyle}>
									<Link to='/edit'> Link Two</Link>
								</div>
							</Content>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item as={Col} colspan={7} style={gridItem}>
							<Header style={flexHeader}>
								<h5>
									<PeoplesIcon />
									My Team
								</h5>
							</Header>
							<Content style={flexContent}>
								<div style={linkStyle}>
									<Link to='/team'> View Team</Link>
								</div>
								<div style={linkStyle}>
									<Link to='/team/manager'>View Manager</Link>
								</div>
							</Content>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item as={Col} colspan={7} style={gridItem}>
							<Header style={flexHeader}>
								<h5>Leave</h5>
							</Header>
							<Content style={flexContent}>
								<div style={linkStyle}>
									<Link to='/leave/request'> Request Leave</Link>
								</div>
								<div style={linkStyle}>
									<Link to='/leave/balance'> View Leave Balance</Link>
								</div>
							</Content>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item as={Col} colspan={7} style={gridItem} smHidden>
							<Header style={flexHeader}>
								<h5>Benefits</h5>
							</Header>
							<Content style={flexContent}>hey</Content>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item as={Col} colspan={7} style={gridItem} smHidden>
							<Header style={flexHeader}>
								<h5>Payslips</h5>
							</Header>
							<Content style={flexContent}>hey</Content>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item as={Col} colspan={7} style={gridItem} smHidden>
							<Header style={flexHeader}>
								<h5>Careers</h5>
							</Header>
							<Content style={flexContent}>hey</Content>
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</div>
			</Content>
		</Container>
	);
});
