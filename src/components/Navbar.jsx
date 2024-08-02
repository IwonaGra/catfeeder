import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { signOut } from "../features/authSlice";
import PetsIcon from "@mui/icons-material/Pets"; // Import ikony kota

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);

	const handleSignOut = () => {
		dispatch(signOut());
		navigate("/sign-in");
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<PetsIcon sx={{ fontSize: 40, mr: 1, color: "background.default" }} />
				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1, color: "#ffffff" }}
				>
					Cat Feeder
				</Typography>
				<Box>
					{user ? (
						<>
							<Button color="inherit" onClick={handleSignOut} sx={{ mr: 1 }}>
								Log Out
							</Button>
						</>
					) : (
						<>
							<Button
								color="inherit"
								component={RouterLink}
								to="/sign-in"
								sx={{ mr: 1 }}
							>
								Log In
							</Button>
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
