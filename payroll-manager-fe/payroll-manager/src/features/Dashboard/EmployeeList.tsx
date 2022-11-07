import React, { useEffect, useState } from 'react';
import { Employee } from '../../app/models/employee';
import { observer } from 'mobx-react-lite';
import {
	HttpTransportType,
	HubConnection,
	HubConnectionBuilder,
} from '@microsoft/signalr';
import { Button, Input } from '@mui/material';

interface Props {
	employees: Array<Employee>;
}

export default observer(function EmployeeList({ employees }: Props) {
	const [connection, setConnection] = useState<null | HubConnection>(null);
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		const connect = new HubConnectionBuilder()
			.withUrl('https://localhost:44328/hubs/notifications', {
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets,
			})
			.withAutomaticReconnect()
			.build();

		setConnection(connect);
	}, []);

	useEffect(() => {
		console.log('inside connection change');
		if (connection) {
			connection.invoke('SendMessage').catch(function (err) {
				console.error(err.toString());
			});

			connection
				.start()
				.then(() => {
					connection.on('ReceiveMessage', (message) => {
						console.log(message);
					});
				})
				.catch((error) => console.log(error));
		}
	}, [connection]);

	const sendMessage = async () => {
		if (connection) {
			try {
				await connection.send('SendMessage', inputText);
			} catch (e) {
				console.log(e);
			}
		} else {
			alert('No connection to server yet.');
		}
	};

	return (
		<>
			<Input
				value={inputText}
				onChange={(input) => {
					setInputText(input.target.value);
				}}
			/>
			<Button onClick={sendMessage}>Send</Button>
		</>
	);
});
