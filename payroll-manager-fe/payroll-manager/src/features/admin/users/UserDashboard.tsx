import { Container, Tabs, Tab, Box, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import UserList from './UserList';

export default function UserDashboard() {
	const [activeMenu, setActiveMenu] = useState(0);

	const {
		authStore: { getUserList, users },
	} = useStore();

	useEffect(() => {
		getUserList();
	}, []);

	return (
		<Container maxWidth={false}>
			<Tabs
				value={activeMenu}
				onChange={(event: any, value: any) => setActiveMenu(value)}
				aria-label='user details'
			>
				<Tab label='User List'></Tab>
				<Tab label='Create User'></Tab>
			</Tabs>

			<Box sx={{ mt: 3 }}>
				<Card>
					{activeMenu === 0 && <UserList users={users} />}
					{activeMenu === 1 && <UserList users={users} />}
				</Card>
			</Box>
		</Container>
	);
}
