import * as styles from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Palette {
		neutral: Palette['primary'];
	}
	interface PaletteOptions {
		neutral: PaletteOptions['primary'];
	}
}
