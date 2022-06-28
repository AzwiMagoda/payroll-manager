import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Header, Content, Nav } from 'rsuite';
import ContactDetails from './ContactDetails';
import Dependants from './Dependants';
import PersonalInfo from './PersonalInfo';

export default observer(function ProfileDashboard() {
	const [activeMenu, setActiveMenu] = useState('Personal Information');

	return (
		<>
			<Header style={{ marginBottom: '3em' }}>
				<h3>Your Profile</h3>
			</Header>
			<Content style={{ width: '60%', margin: '0 auto' }}>
				<Nav appearance='subtle' justified>
					<Nav.Item
						active={activeMenu === 'Personal Information'}
						onClick={() => setActiveMenu('Personal Information')}
					>
						Personal Information
					</Nav.Item>
					<Nav.Item
						active={activeMenu === 'Contact Details'}
						onClick={() => setActiveMenu('Contact Details')}
					>
						Contact Details
					</Nav.Item>
					<Nav.Item
						active={activeMenu === 'Dependants'}
						onClick={() => setActiveMenu('Dependants')}
					>
						Dependants
					</Nav.Item>
					<Nav.Item
						active={activeMenu === 'Emergency Contact'}
						onClick={() => setActiveMenu('Emergency Contact')}
					>
						Emergency Contact
					</Nav.Item>
				</Nav>

				{activeMenu === 'Personal Information' && <PersonalInfo />}
				{activeMenu === 'Contact Details' && <ContactDetails />}
				{activeMenu === 'Dependants' && <Dependants />}
			</Content>
		</>
	);
});
