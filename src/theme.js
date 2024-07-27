import { createTheme } from "@mui/material"; // tutaj importuję theme z mui

export const theme = createTheme({
	palette: {
		mode: "light", // tutaj określam pallete mode: light/dark
		primary: {
			main: "#3f51b5",
		},
		secondary: {
			main: "#f50057",
		},
	},
});

// Theme zmodyfikować jeszcze!!! themeOptions + pododawać style komponentów
