import { Box, Container, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import Remuneration from './remunerationHome/Remuneration';

export default function RemunerationDashboard() {
	const [activeMenu, setActiveMenu] = useState(0);

	return (
		<Container maxWidth={false}>
			<Tabs
				value={activeMenu}
				onChange={(event: any, value: any) => setActiveMenu(value)}
				aria-label='profile detail tabs'
			>
				<Tab label='Remuneration'></Tab>
				<Tab label='Benefits'></Tab>
				<Tab label='Deductions'></Tab>
			</Tabs>

			<Box sx={{ mt: 3 }}>{activeMenu === 0 && <Remuneration />}</Box>
		</Container>
	);
}
