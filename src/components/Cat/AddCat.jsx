import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCat, clearError } from "../../features/catSlice";
import { Box, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

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
			setSnackbarMessage(error.message || "Failed to add cat");
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			dispatch(clearError());
		}
	};

	return <Box component="form" onSubmit={handleAddCat}></Box>;
};

export default AddCat;
