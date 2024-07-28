import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCats } from "../features/catSlice";
import {
	Box,
	Typography,
	Button,
	Grid,
	Card,
	CardContent,
	CardActions,
	CircularProgress,
	Container,
	Avatar,
	// LinearProgress,
} from "@mui/material";
import AddCat from "./Cat/AddCat";

// import CatDetails from "./Cat/CatDetail";

const Dashboard = () => {
	const dispatch = useDispatch();
	const { cats, loading, error } = useSelector((state) => state.cats);
	const [showAddCatForm, setShowAddCatForm] = useState(false);

	useEffect(() => {
		dispatch(fetchCats());
	}, [dispatch]);

	const handleAddCatSuccess = () => {
		console.log("handleAddCatSuccess");
		setShowAddCatForm(false);
		dispatch(fetchCats()); // Odświeża listę kotów po dodaniu nowego
	};

	// if (loading) return <Typography>Loading...</Typography>;
	if (loading) return <CircularProgress />;
	if (error) return <Typography color="error">{error}</Typography>;

	return (
		<Container maxWidth="lg">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mt: 4,
					mb: 4,
				}}
			>
				<Typography variant="h4" gutterBottom sx={{ color: "primary.main" }}>
					Your Cats Dashboard
				</Typography>
				<Button
					onClick={() => setShowAddCatForm(!showAddCatForm)}
					variant="contained"
					sx={{ mb: 2 }}
				>
					{showAddCatForm ? "Hide Add Cat Form" : "Add New Cat"}
				</Button>

				{showAddCatForm && <AddCat onAddSuccess={handleAddCatSuccess} />}

				{Array.isArray(cats) && cats.length > 0 ? (
					<Grid container spacing={3}>
						{cats.map((cat) => (
							<Grid item xs={12} sm={6} md={4} key={cat.id}>
								<Card style={{ cursor: "pointer" }}>
									<CardContent>
										<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
											<Avatar
												src={cat.photo_url}
												sx={{ width: 60, height: 60, mr: 2 }}
											>
												{cat.name.charAt(0)}
											</Avatar>
											<Typography variant="h5">{cat.name}</Typography>
										</Box>
										<Typography color="text.secondary">
											Age: {cat.age}
										</Typography>
										<Typography color="text.secondary">
											Daily Caloric Needs: {cat.calories_need} kcal
										</Typography>
									</CardContent>
									<CardActions>
										{/* Tu możesz dodać przyciski do edycji, dodawania karmienia itp. */}
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				) : (
					<Typography>No cats found. Add a new cat to get started!</Typography>
				)}
			</Box>
		</Container>
	);
};

export default Dashboard;
