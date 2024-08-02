import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFeedings } from "../../features/feedingSlice";
import { fetchCats } from "../../features/catSlice";
import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	CircularProgress,
} from "@mui/material";

const FeedingHistory = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { feedings, loading, error } = useSelector((state) => state.feedings);
	const { cats } = useSelector((state) => state.cats);

	useEffect(() => {
		dispatch(fetchFeedings(id));
		dispatch(fetchCats());
	}, [dispatch, id]);

	if (loading) return <CircularProgress />;
	if (error) return <Typography color="error">{error}</Typography>;

	const cat = cats.find((cat) => cat.id === parseInt(id));

	if (!cat) {
		return <Typography color="error">Cat not found.</Typography>;
	}

	const getTotalCalories = () => {
		return feedings
			.filter((feeding) => feeding && feeding.amount !== null)
			.reduce((total, feeding) => total + (feeding.amount || 0), 0);
	};

	const totalCalories = getTotalCalories();

	const caloriesColor = totalCalories >= cat.calories_need ? "green" : "black";

	return (
		<Box sx={{ m: 2 }}>
			<Typography variant="h4" gutterBottom>
				Feeding History
			</Typography>
			<Typography
				variant="subtitle1"
				gutterBottom
				sx={{ color: caloriesColor }}
			>
				Total Calories: {totalCalories} kcal
			</Typography>
			{feedings.length === 0 ? (
				<Typography>No feeding records found.</Typography>
			) : (
				<List>
					{feedings.map((feeding) => (
						<ListItem key={feeding.id}>
							<ListItemText
								primary={`${feeding.amount}g`}
								secondary={new Date(feeding.timestamp).toLocaleString()}
							/>
						</ListItem>
					))}
				</List>
			)}
		</Box>
	);
};

export default FeedingHistory;
