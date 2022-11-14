import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Stack,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

export default observer(function EditUser() {
	let navigate = useNavigate();

	return (
		<Container maxWidth={false}>
			<Box sx={{ mt: 3 }}>
				<Card>
					<CardContent>
						<Stack
							direction='row'
							justifyContent='space-between'
							alignItems='center'
							spacing={2}
						>
							<Stack
								direction='row'
								justifyContent='flex-start'
								alignItems='center'
								spacing={2}
							>
								<Button
									startIcon={<ArrowBackIosIcon fontSize='small' />}
									sx={{ mr: 1 }}
									onClick={(e: any) => navigate(-1)}
									// variant='contained'
								>
									Back
								</Button>
							</Stack>

							<Stack
								direction='row'
								justifyContent='flex-end'
								alignItems='center'
								spacing={2}
							>
								<Button
									startIcon={<SaveIcon fontSize='small' />}
									sx={{ mr: 1 }}
									onClick={(e: any) => console.log(e)}
									color='info'
									// variant='contained'
								>
									Save Changes
								</Button>
								<Button
									// startIcon={<ArrowBackIosIcon fontSize='small' />}
									sx={{ mr: 1 }}
									onClick={(e: any) => console.log(e)}
									color='error'
									variant='contained'
								>
									Deactivate User
								</Button>
							</Stack>
						</Stack>
					</CardContent>
				</Card>
			</Box>
			<Box sx={{ mt: 3 }}>
				<Card>
					<CardContent></CardContent>
				</Card>
			</Box>
		</Container>
	);
});
