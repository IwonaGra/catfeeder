import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { Provider } from "react-redux"; //tutaj importuję providera, który dostarcza redux store dla aplikacji
import { store } from "./store"; // tutaj importuję store
import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material"; // tutaj importuję podstawowe style dla aplikacji
import Dashboard from "./components/Dashboard"; // tutaj importuję komponent tablicy "Dashboard"
import SignIn from "./components/User/SignIn"; // tutaj importuję komponent logowania
import SignUp from "./components/User/SignUp"; // tutaj importuję komponent rejestracji
// import CatDetail from "./components/Cat/CatDetail"; // tutaj importuję komponent info o kocie
import EditCat from "./components/Cat/EditCat"; // tutaj importuję komponent edycji danych kota
import Navbar from "./components/Navbar"; // tutaj importuję komponent paska nawigacyjnego
import { Outlet } from "react-router-dom"; // tutaj importuję Outlet
import { theme } from "./theme"; // tutaj importuję mój theme

// Tutaj dodałam podział layoutu na navbar i outlet
const Layout = () => (
	<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
		<Navbar />
		<Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
			<Outlet />
		</Container>
	</Box>
);

// Tutaj dodałam strukturę aplikacji: Provider, Router, themeProvider,CssBaseline + linki do ekranów aplikacji
const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route path="/sign-in" element={<SignIn />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/" element={<Layout />}>
							<Route index element={<Navigate to="/sign-in" replace />} />
							<Route path="/dashboard" element={<Dashboard />} />
							{/* <Route path="/cat/:id" element={<CatDetail />} /> */}
							<Route path="/cat/:id/edit" element={<EditCat />} />
							{/* <Route index element={<Navigate to="/dashboard" replace />} /> */}
						</Route>
					</Routes>
				</ThemeProvider>
			</Router>
		</Provider>
	);
};

export default App;
