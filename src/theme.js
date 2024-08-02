import { createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		background: {
			default: "#ffffff",
		},
		primary: {
			main: "#4CAF50",
			light: "#7add87",
		},
		secondary: {
			main: "#88e8e6",
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
					backgroundColor: "#FF9800",
					borderRadius: 20,
					textTransform: "none",
					color: "#ffffff",
					"&:hover": {
						backgroundColor: "#F57C20",
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 16, // Zaokrąglone karty
					boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
				},
			},
		},
	},
});
