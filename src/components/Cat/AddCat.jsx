import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCat, clearError } from "../../features/catSlice";
import {
	Box,
	Snackbar,
	TextField,
	Button,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCat = () => {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [caloricNeeds, setCaloricNeeds] = useState("");
	const [photoUrl, setPhotoUrl] = useState("");
	const [breed, setBreed] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("error");

	const dispatch = useDispatch(); //akcje redux
	const error = useSelector((state) => state.cats.error);

	const catBreeds = [
		"Domestic Longhair",
		"Maine Coon",
		"Siamese",
		"Persian",
		"Ragdoll",
		"British Shorthair",
		"Bengal",
		"Sphynx",
		"Scottish Fold",
		"Abyssinian",
		"Devon Rex",
		"American Shorthair",
		"Norwegian Forest Cat",
		"Oriental Shorthair",
		"Russian Blue",
		"Birman",
		"Savannah",
		"Siberian",
		"Burmese",
		"Exotic Shorthair",
		"Himalayan",
	];

	useEffect(() => {
		if (error) {
			setSnackbarMessage(error);
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			dispatch(clearError());
		}
	}, [error, dispatch]);

	useEffect(() => {
		if (breed) {
			switch (breed.toLowerCase()) {
				case "domestic shorthair":
					setCaloricNeeds(300);
					break;
				case "persian":
					setCaloricNeeds(300);
					break;
				case "siamese":
					setCaloricNeeds(250);
					break;
				case "maine coon":
					setCaloricNeeds(350);
					break;
				case "ragdoll":
					setCaloricNeeds(300);
					break;
				case "british shorthair":
					setCaloricNeeds(300);
					break;
				case "bengal":
					setCaloricNeeds(250);
					break;
				case "sphynx":
					setCaloricNeeds(300);
					break;
				case "abyssinian":
					setCaloricNeeds(250);
					break;
				case "devon rex":
					setCaloricNeeds(250);
					break;
				case "american shorthai":
					setCaloricNeeds(300);
					break;
				case "norwegian forest cat":
					setCaloricNeeds(350);
					break;
				case "oriental shorthair":
					setCaloricNeeds(230);
					break;
				case "russian blue":
					setCaloricNeeds(230);
					break;
				case "birman":
					setCaloricNeeds(250);
					break;
				case "savannah":
					setCaloricNeeds(350);
					break;
				case "siberian":
					setCaloricNeeds(350);
					break;
				case "himalayan":
					setCaloricNeeds(250);
					break;
				default:
					setCaloricNeeds(200);
					break;
			}
		}
	}, [breed]);

	const handleAddCat = async (e) => {
		e.preventDefault();
		const newCat = {
			name,
			age: parseInt(age),
			calories_need: parseInt(caloricNeeds),
			photo_url: photoUrl,
			breed,
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

	const handleAgeChange = (e) => {
		const value = e.target.value;
		if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 100)) {
			setAge(value);
		}
	};

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
				onChange={handleAgeChange}
				margin="normal"
				required
				inputProps={{ min: 0, max: 100 }}
			/>
			<FormControl fullWidth margin="normal">
				<InputLabel id="breed-select-label">Breed</InputLabel>
				<Select
					labelId="breed-select-label"
					id="breed-select"
					value={breed}
					label="Breed"
					onChange={(e) => setBreed(e.target.value)}
					required
				>
					{catBreeds.map((breed) => (
						<MenuItem key={breed} value={breed}>
							{breed}
						</MenuItem>
					))}
				</Select>
			</FormControl>

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
