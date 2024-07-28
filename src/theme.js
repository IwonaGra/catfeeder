import { createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		background: {
			default: "#ffffff",
		},
		primary: {
			main: "#4caf50", // Zielony kolor główny
			light: "#81c784",
		},
		secondary: {
			main: "#81c784", // Jasnozielony kolor dodatkowy
		},
	},
	typography: {
		fontFamily: "Roboto, Arial, sans-serif",
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 20,
					textTransform: "none",
					color: "#ffffff",
					"&:hover": {
						backgroundColor: "#81c784",
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 16, // Zaokrąglone karty
					boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
					// Delikatny cień
				},
			},
		},
	},
});

// Theme zmodyfikować jeszcze!!! themeOptions + pododawać style komponentów
