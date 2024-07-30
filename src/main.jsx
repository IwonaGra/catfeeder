import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { theme } from "./theme";
import { store } from "./store"; //  store

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Root element not found"); // dodana walidacja - sprawdzam po ID czy element root został dodany (index.html)
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Suspense fallback={<div>Loading...</div>}>
					<App />
				</Suspense>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
