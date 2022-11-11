import { Box, Card, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useStore } from '../../../app/stores/store';
import RemunerationChart from './RemunerationChart';

export default function Remuneration() {
	const {
		remunerationStore: { loading, getRemuneration, remuneration },
	} = useStore();

	useEffect(() => {
		getRemuneration();
	});

	return (
		<Card>
			{remuneration && (
				<Grid container spacing={2}>
					<Grid item xs={5}>
						thing 1
					</Grid>
					<Grid item xs={7}>
						<RemunerationChart remuneration={remuneration} />
					</Grid>
				</Grid>
			)}
		</Card>
	);
}
