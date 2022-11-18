import { Container, Tabs, Tab } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

export default observer(function HREmployeesDashboard() {
	const [activeMenu, setActiveMenu] = useState(0);

	return (
		<Container maxWidth={false}>
			<Tabs
				value={activeMenu}
				onChange={(event: any, value: any) => setActiveMenu(value)}
				aria-label='profile detail tabs'
			>
				<Tab label='Employee List'></Tab>
				<Tab label='Create Profile'></Tab>
			</Tabs>
		</Container>
	);
});
