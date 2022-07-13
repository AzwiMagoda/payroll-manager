import { TextField } from '@mui/material';
import React from 'react';

interface Props {
	id: string;
	label: string;
	type: string;
	inputProps?: any;
	error?: boolean | undefined;
	helperText?: string | false;
	value?: any;
	onChange?: any;
}

export default function TextFieldInput({
	id,
	label,
	type,
	inputProps,
	error,
	helperText,
	value,
	onChange,
}: Props) {
	return (
		<TextField
			margin='normal'
			variant='standard'
			fullWidth
			id={id}
			label={label}
			name={id}
			type={type}
			InputProps={inputProps}
			error={error}
			helperText={helperText}
			value={value}
			onChange={onChange}
		/>
	);
}
