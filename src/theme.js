import { createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		background: {
			default: "#ffffff",
		},
		primary: {
			main: "#55bde0", //  kolor główny
			light: "#79d3f2",
		},
		secondary: {
			main: "#88e8e6", // Jasny kolor dodatkowy #79d3f2
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
						backgroundColor: "#79d3f2",
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
