import React from 'react';
import { Button, ButtonToolbar, Form, Input, InputGroup } from 'rsuite';
import EyeCloseIcon from '@rsuite/icons/EyeClose';

export default function Login() {
	const styles = {
		width: 300,
		marginBottom: 10,
	};
	// box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
	// box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	const formStyle = {
		backgroundColor: '#f7f7fa',
		margin: '15% auto',
		padding: '0.5em',
		width: '40%',
		boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
	};

	const h3Style = {
		textAlign: 'center' as 'center',
		marginBottom: '8px',
	};

	const formGroupStyle = {
		margin: '0 25%',
		width: '50%',
	};

	return (
		<Form layout='horizontal' style={formStyle}>
			<h3 style={h3Style}>Login</h3>
			<Form.Group controlId='email' style={formGroupStyle}>
				<Form.ControlLabel>Email</Form.ControlLabel>
				<InputGroup style={styles}>
					<InputGroup.Addon> @</InputGroup.Addon>
					<Input />
				</InputGroup>
			</Form.Group>
			<Form.Group controlId='password' style={formGroupStyle}>
				<Form.ControlLabel>Password</Form.ControlLabel>
				<InputGroup style={styles}>
					<InputGroup.Addon>
						<EyeCloseIcon />
					</InputGroup.Addon>
					<Input type='password' />
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
				>
					Login
				</Button>
			</Form.Group>
		</Form>
	);
}
