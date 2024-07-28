import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCat, clearError } from "../../features/catSlice";
import { Box, Snackbar, TextField, Button, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCat = () => {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [caloricNeeds, setCaloricNeeds] = useState("");
	const [photoUrl, setPhotoUrl] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("error");

	const dispatch = useDispatch(); //akcje redux
	const error = useSelector((state) => state.cats.error);

	useEffect(() => {
		if (error) {
			setSnackbarMessage(error);
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			dispatch(clearError());
		}
	}, [error, dispatch]);

	const handleAddCat = async (e) => {
		e.preventDefault();
		const newCat = {
			name,
			age: parseInt(age),
			calories_need: parseInt(caloricNeeds),
			photo_url: photoUrl,
		};

		try {
			const addCatResult = await dispatch(addCat(newCat));
			if (addCat.fulfilled.match(addCatResult)) {
				//sukces,dodało:
				setSnackbarMessage("Cat added successfully!");
				setSnackbarSeverity("success");
				setOpenSnackbar(true);

				setName("");
				setAge("");
				setCaloricNeeds("");
				setPhotoUrl("");
			} else {
				throw new Error(addCatResult.error.message);
			}
		} catch (error) {
			console.error("Error adding cat:", error);
			setSnackbarMessage("Failed to add cat");
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
		}
	};

	const handleCloseSnackbar = () => setOpenSnackbar(false);

	return (
		<Box
			component="form"
			onSubmit={handleAddCat}
			sx={{ "& .MuiTextField-root": { mb: 2 } }}
		>
			<Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
				Add New Cat
			</Typography>
			<TextField
				fullWidth
				label="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				margin="normal"
				required
			/>
			<TextField
				fullWidth
				label="Age"
				type="number"
				value={age}
				onChange={(e) => setAge(e.target.value)}
				margin="normal"
				required
			/>

			<TextField
				fullWidth
				label="Caloric Needs"
				type="number"
				value={caloricNeeds}
				onChange={(e) => setCaloricNeeds(e.target.value)}
				margin="normal"
				required
			/>
			<TextField
				fullWidth
				label="Photo URL"
				value={photoUrl}
				onChange={(e) => setPhotoUrl(e.target.value)}
				margin="normal"
				required
			/>
			<Button type="submit" variant="contained" sx={{ mt: 2 }}>
				Add Cat
			</Button>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default AddCat;
