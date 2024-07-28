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
	Avatar,
	IconButton,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCat = () => {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [caloricNeeds, setCaloricNeeds] = useState("");
	const [breed, setBreed] = useState("");
	const [gender, setGender] = useState("");
	const [photoUrl, setPhotoUrl] = useState("");
	const [photoFile, setPhotoFile] = useState(null);
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

		let photoUrlToSave = photoUrl;

		if (photoFile) {
			console.log(`nie wiem póki co`);
		}

		const newCat = {
			name,
			age: parseInt(age),
			calories_need: parseInt(caloricNeeds),
			photo_url: photoUrlToSave,
			breed,
			gender,
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
				setBreed("");
				setGender("");
				setPhotoUrl("");
				setPhotoFile(null);
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

	const handlePhotoChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setPhotoFile(file);
			setPhotoUrl(URL.createObjectURL(file));
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleAddCat}
			sx={{ "& .MuiTextField-root": { mb: 2 } }}
		>
			{/* <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
				Add New Cat
			</Typography> */}

			<Box
				sx={{
					mb: 2,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography
					variant="h5"
					sx={{
						color: "primary.main",
						mb: 2,
						mt: 4,
						textAlign: "center",
					}}
				>
					Add New Cat
				</Typography>
				<Avatar
					src={photoUrl}
					sx={{
						width: 150,
						height: 150,
						mr: 2,
						bgcolor: photoUrl ? "transparent" : "grey.300",
					}}
				>
					{!photoUrl && "Cat's avatar"}
				</Avatar>
				<input
					accept="image/*"
					style={{ display: "none" }}
					id="icon-button-file"
					type="file"
					onChange={handlePhotoChange}
				/>
				<label htmlFor="icon-button-file">
					<IconButton
						color="primary"
						aria-label="upload picture"
						component="span"
					>
						<AddAPhotoIcon />
					</IconButton>
				</label>
			</Box>

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
				<InputLabel id="gender-select-label">Gender</InputLabel>
				<Select
					labelId="gender-select-label"
					id="gender-select"
					value={gender}
					label="Gender"
					onChange={(e) => setGender(e.target.value)}
					required
				>
					<MenuItem value="she">She</MenuItem>
					<MenuItem value="he">He</MenuItem>
				</Select>
			</FormControl>
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

			<Button type="submit" variant="contained" sx={{ mt: 2, mb: 4 }}>
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
