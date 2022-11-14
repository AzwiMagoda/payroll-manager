import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { UserDetails } from '../../../app/models/userDetails';

interface Props {
	users: UserDetails[];
}
export default observer(function UserList({ users }: Props) {
	useEffect(() => {
		console.log(users);
	});

	return <div>UserList</div>;
});
