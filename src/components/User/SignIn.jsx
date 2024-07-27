import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../features/authSlice";
import { theme } from "../../theme";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets"; // Import ikony kota

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signIn({ email, password }))
			.unwrap()
			.then(() => {
				navigate("/dashboard"); //po logowaniu przełącz użytkownika do tablicy (dashboardu)
			})
			.catch((error) => {
				console.error("Error logging in:", error); // Walidacja przy logowaniu
			});
	};

	return (
		// Stylizacja dla całego kontenera z formularzem
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				backgroundColor: "#f5f5f5",
			}}
		>
			{/* Dodany Paper dla efektu karty */}
			<Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
				{/* Dodany nagłówek "CAT FEEDER" z ikoną - kiepskie do ostylowania jeszcze */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						mb: 3,
					}}
				>
					<PetsIcon sx={{ fontSize: 40, mr: 1, color: "primary.main" }} />
					<Typography
						variant="h3"
						component="h1"
						gutterBottom
						sx={{ fontWeight: "bold", color: "primary.main" }}
					>
						CAT FEEDER
					</Typography>
				</Box>
				<Box component="form" onSubmit={handleSubmit}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={loading}
					>
						Sign In
					</Button>
					<Button
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={loading}
						color="inherit"
						component={RouterLink}
						to="/sign-up"
					>
						Sign Up
					</Button>
					{error && (
						<Typography color="error" align="center">
							{error}
						</Typography>
					)}
				</Box>
			</Paper>
		</Box>
	);
};

export default SignIn;
