import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // dodana walidacja propsów
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
import { uploadPhotoToServer } from "../../utils/uploadPhoto";
import { supabase } from "../../utils/supabase"; // Import Supabase client

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// prop onAddSucces przekazywany z Dashboard - zamyka formularz po dodaniu kota
const AddCat = ({ onAddSuccess }) => {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [caloricNeeds, setCaloricNeeds] = useState(0);
	const [breed, setBreed] = useState("");
	const [gender, setGender] = useState("");
	const [photoUrl, setPhotoUrl] = useState("");
	const [photoFile, setPhotoFile] = useState(null);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("error");
	const [catBreeds, setCatBreeds] = useState([]);

	const dispatch = useDispatch();
	const { error } = useSelector((state) => state.cats);

	useEffect(() => {
		const fetchCatBreeds = async () => {
			const { data, error } = await supabase.from("cat_breeds").select("*");
			if (error) {
				console.error("Error fetching cat breeds:", error);
			} else {
				setCatBreeds(data);
			}
		};

		fetchCatBreeds();
	}, []);

	useEffect(() => {
		if (error) {
			setSnackbarMessage(error);
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			dispatch(clearError());
		}
	}, [error, dispatch]);

	useEffect(() => {
		// zapotrzebowanie kaloryczne na podstawie rasy i płci
		const breedData = catBreeds.find((b) => b.breed === breed);
		if (breedData) {
			setCaloricNeeds(
				gender === "she"
					? breedData.caloric_needs_female
					: breedData.caloric_needs_male
			);
		} else {
			setCaloricNeeds(0);
		}
	}, [breed, gender, catBreeds]);

	const handleAddCat = async (e) => {
		e.preventDefault();

		let photoUrlToSave = photoUrl;

		if (photoFile) {
			try {
				const uploadedPhotoUrl = await uploadPhotoToServer(photoFile);
				photoUrlToSave = uploadedPhotoUrl;
			} catch (error) {
				console.error("Error uploading photo:", error);
				setSnackbarMessage("Failed to upload photo");
				setSnackbarSeverity("error");
				setOpenSnackbar(true);
				return;
			}
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
				setSnackbarMessage("Cat added successfully!");
				setSnackbarSeverity("success");
				setOpenSnackbar(true);
				onAddSuccess(); // Ukryj formularz po dodaniu kota
				// Resetowanie stanu formularza
				setName("");
				setAge("");
				setCaloricNeeds(0);
				setPhotoUrl("");
				setBreed("");
				setGender("");
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

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
		dispatch(clearError());
	};

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
					sx={{ color: "primary.main", mb: 2, mt: 4, textAlign: "center" }}
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
					onChange={(e) => {
						setGender(e.target.value);
						setCaloricNeeds(0); // reset kalorii gdy zmienia sie płeć
					}}
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
					onChange={(e) => {
						setBreed(e.target.value);
						setCaloricNeeds(0); // reset kalorii gdy zmienia sie rasa
					}}
					required
				>
					{catBreeds.map((breed) => (
						<MenuItem key={breed.id} value={breed.breed}>
							{breed.breed}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Typography variant="subtitle1" sx={{ mr: 2 }}>
					Caloric Needs:
				</Typography>
				<Typography variant="h6" color="primary">
					{caloricNeeds > 0 ? caloricNeeds : "0"}
				</Typography>
			</Box>

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

// Zdefiniowana statyczna właściwość propTypes w komponencie AddCat, która określa, że prop onAddSuccess jest wymagany i musi być funkcją
AddCat.propTypes = {
	onAddSuccess: PropTypes.func.isRequired,
};

export default AddCat;
