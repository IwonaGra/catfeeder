import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { Provider } from "react-redux"; //providera, który dostarcza redux store dla aplikacji
import { store } from "./store";
import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material"; // style dla aplikacji
import Dashboard from "./components/Dashboard";
import SignIn from "./components/User/SignIn";
import SignUp from "./components/User/SignUp";
import FeedingHistory from "./components/Feeding/FeedingHistory";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { theme } from "./theme";

// Layout: navbar, outlet
const Layout = () => (
	<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
		<Navbar />
		<Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
			<Outlet />
		</Container>
	</Box>
);

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
							<Route
								path="/cat/:id/feeding-history"
								element={<FeedingHistory />}
							/>
						</Route>
					</Routes>
				</ThemeProvider>
			</Router>
		</Provider>
	);
};

export default App;
