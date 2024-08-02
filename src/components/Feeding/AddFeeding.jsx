import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFeeding } from "../../features/feedingSlice";
import { Box, Select, MenuItem, Button, Typography } from "@mui/material";
import PropTypes from "prop-types"; // Importuj PropTypes

const AddFeeding = ({ catId, onAddSuccess }) => {
	const [amount, setAmount] = useState(10); // Ustaw domyślną wartość na 10
	const dispatch = useDispatch();

	const handleAddFeeding = (e) => {
		e.preventDefault();

		// Dodaj karmienie do bazy danych
		dispatch(addFeeding({ cat_id: catId, amount })).then(() => {
			// Wywołaj onAddSuccess z amount po pomyślnym dodaniu
			onAddSuccess(amount);
		});
	};

	return (
		<Box component="form" onSubmit={handleAddFeeding} sx={{ m: 2 }}>
			<Typography variant="h6" gutterBottom>
				Add Feeding
			</Typography>
			<Select
				fullWidth
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				margin="none"
				required
			>
				{/* Generuj opcje co 10 gramów */}
				{Array.from({ length: 10 }, (_, index) => (
					<MenuItem key={index} value={(index + 1) * 10}>
						{(index + 1) * 10} g/ kcal
					</MenuItem>
				))}
			</Select>
			<Button type="submit" variant="contained" sx={{ mt: 2 }}>
				Feed me:)
			</Button>
		</Box>
	);
};

// Dodaj walidację propsów
AddFeeding.propTypes = {
	catId: PropTypes.number.isRequired,
	onAddSuccess: PropTypes.func.isRequired,
};

export default AddFeeding;
