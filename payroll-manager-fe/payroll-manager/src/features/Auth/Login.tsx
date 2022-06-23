import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputGroup } from 'rsuite';
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import { formGroupStyle, formStyle, h3Style, styles } from './styles';
import { useStore } from '../../app/stores/store';
import { Login as LoginDto } from '../../app/models/login';
import { Navigate, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export default observer(function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const {
		authStore: { login, user },
		employeeStore: { currentEmployee },
	} = useStore();

	const handleSubmit = async () => {
		await login(new LoginDto(email, password));
	};

	return (
		<>
			{user && currentEmployee && <Navigate to='/dashboard' replace={true} />}
			<Form
				layout='horizontal'
				style={formStyle}
				onSubmit={() => handleSubmit()}
			>
				<h3 style={h3Style}>Login</h3>
				<Form.Group controlId='email' style={formGroupStyle}>
					<Form.ControlLabel>Email</Form.ControlLabel>
					<InputGroup style={styles}>
						<InputGroup.Addon> @</InputGroup.Addon>
						<Input onChange={(e) => setEmail(e)} />
					</InputGroup>
				</Form.Group>
				<Form.Group controlId='password' style={formGroupStyle}>
					<Form.ControlLabel>Password</Form.ControlLabel>
					<InputGroup style={styles}>
						<InputGroup.Addon>
							<EyeCloseIcon />
						</InputGroup.Addon>
						<Input type='password' onChange={(e) => setPassword(e)} />
					</InputGroup>
				</Form.Group>

				<Form.Group>
					<Button
						appearance='default'
						size='lg'
						style={{
							margin: '5px 25%',
							width: '50%',
							backgroundColor: '#d9d9d9',
						}}
						type='submit'
					>
						Login
					</Button>
				</Form.Group>
			</Form>
		</>
	);
});
