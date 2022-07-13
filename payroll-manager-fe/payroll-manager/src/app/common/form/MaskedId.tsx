import React, { RefCallback } from 'react';
import { IMaskInput } from 'react-imask';

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const MaskedId = React.forwardRef<HTMLElement, CustomProps>(function MaskedId(
	props,
	ref
) {
	const { onChange, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask='###### #### ###'
			definitions={{
				'#': /[0-9]/,
			}}
			inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
			onAccept={(value: any) =>
				onChange({ target: { name: props.name, value } })
			}
			overwrite
			unmask={true}
		/>
	);
});

export default MaskedId;
