import { Container, Tabs, Tab, Box, Card } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import CreateUser from './createUser/CreateUser';
import UserList from './UserList';

interface Props {
	role: string;
}

export default observer(function UserDashboard({ role }: Props) {
	const [activeMenu, setActiveMenu] = useState(0);

	return (
		<Container maxWidth={false}>
			<Tabs
				value={activeMenu}
				onChange={(event: any, value: any) => setActiveMenu(value)}
				aria-label='user details'
			>
				<Tab label='User List'></Tab>
				{role === 'Admin' && <Tab label='Create User'></Tab>}
			</Tabs>

			<Box sx={{ mt: 3 }}>
				{activeMenu === 0 && <UserList />}
				{activeMenu === 1 && role === 'Admin' && <CreateUser />}
			</Box>
		</Container>
	);
});
