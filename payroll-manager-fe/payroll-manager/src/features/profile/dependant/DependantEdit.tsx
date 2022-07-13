import React from 'react';
import { Dependant } from '../../../app/models/dependant';
import { observer } from 'mobx-react-lite';

interface Props {
	dependant: Dependant;
}

export default observer(function DependantEdit({ dependant }: Props) {
	return <form></form>;
});
