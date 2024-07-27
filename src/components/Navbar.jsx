import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { signOut } from "../features/authSlice";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);

	const handleSignOut = () => {
		dispatch(signOut());
		navigate("/sign-in");
	};

	return (
		// zmienić tytuał apki na ładniejszy
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Cat Feeder =(o.o)=
				</Typography>
				<Box>
					{user ? (
						<>
							<Button color="inherit" component={RouterLink} to="/dashboard">
								Dashboard
							</Button>
							<Button color="inherit" onClick={handleSignOut}>
								Log Out
							</Button>
						</>
					) : (
						<>
							<Button color="inherit" component={RouterLink} to="/dashboard">
								Dashboard
							</Button>
							<Button color="inherit" component={RouterLink} to="/sign-in">
								Log out
							</Button>
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
