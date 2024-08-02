import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCats } from "../features/catSlice";
import { fetchFeedings, resetFeedings } from "../features/feedingSlice";
import {
	Box,
	Typography,
	Button,
	Grid,
	Card,
	CardContent,
	CircularProgress,
	Container,
	Avatar,
	LinearProgress,
} from "@mui/material";
import AddCat from "./Cat/AddCat";
import AddFeeding from "./Feeding/AddFeeding";

const Dashboard = () => {
	const dispatch = useDispatch();

	const { cats, loading, error } = useSelector((state) => state.cats);
	const { feedings } = useSelector((state) => state.feedings); // Pobierz feedings z Redux
	const [showAddCatForm, setShowAddCatForm] = useState(false);
	const [selectedCatId, setSelectedCatId] = useState(null); // Stan do przechowywania Id wybranego kota
	const [feedingAmounts, setFeedingAmounts] = useState({}); // Stan do przechowywania aktualnych wartości karmienia dla każdego kota
	const [feedingHistory, setFeedingHistory] = useState({});
	const [feedingMessage, setFeedingMessage] = useState(""); // Stan do przechowywania komunikatu o karmieniu

	// Ładowanie kotów
	useEffect(() => {
		dispatch(fetchCats());
	}, [dispatch]);

	// Ładowanie karmienia po załadowaniu kotów
	useEffect(() => {
		if (cats.length > 0) {
			cats.forEach((cat) => {
				dispatch(fetchFeedings(cat.id)); // Sprawdza czy karmienia są pobierane dla każdego kota
			});
		}
	}, [dispatch, cats]);

	const handleAddCatSuccess = () => {
		console.log("handleAddCatSuccess");
		setShowAddCatForm(false);
		dispatch(fetchCats()); // Odświeża listę kotów po dodaniu nowego kota
	};

	const handleAddFeedingClick = (catId) => {
		setSelectedCatId(catId); // Ustaw wybrane id kota
	};

	const handleFeedingHistoryClick = (catId) => {
		// Całkowita liczba kalorii dla danego kota
		const totalCalories = getTotalCaloriesForCat(catId);

		// Dodawanie dni z sumą kalorii posiłków kota do historii, niezależnie od tego, czy kot jest najedzony
		setFeedingHistory((prev) => ({
			...prev,
			[catId]: [
				...(prev[catId] || []),
				`Day ${(prev[catId]?.length || 0) + 1}: ${totalCalories} kcal`,
			],
		}));

		// Resetkarmienie dla kota
		handleResetFeedings(catId);

		// Reset komunikatu dla tego kota
		setFeedingMessage((prev) => ({ ...prev, [catId]: "" }));
	};

	// Zaktualizowana funkcja do dodawania karmienia
	const handleAddFeedingSuccess = (amount) => {
		// Po dodaniu karmienia, zaktualizuj feedings
		dispatch(fetchFeedings(selectedCatId)); // feedings są aktualizowane tylko dla wybranego kota
		setFeedingAmounts((prev) => ({
			...prev,
			[selectedCatId]: (prev[selectedCatId] || 0) + amount, // Aktualizacja lokalnego stanu karmienia
		}));
		setSelectedCatId(null); // Reset wybranego kota po dodaniu karmienia
	};

	// Funkcja do resetowania karmienia dla danego kota
	const handleResetFeedings = (catId) => {
		dispatch(resetFeedings(catId)); // Wyślij akcję resetFeedings z catId
		setFeedingAmounts((prev) => ({ ...prev, [catId]: 0 })); // Resetuj lokalny stan karmienia do 0
	};

	// Funkcja do zliczania kalorii dla danego kota
	const getTotalCaloriesForCat = (catId) => {
		return feedings
			.filter((feeding) => feeding && feeding.cat_id === catId) // Filtruj posiłki dla danego kota
			.reduce((total, feeding) => total + (feeding?.amount || 0), 0); // Sumuj kalorie
	};

	// Funkcja normalizująca
	const normalize = (value, min, max) => {
		return ((value - min) * 100) / (max - min);
	};

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
						{cats.map((cat) => {
							const feedingAmount = feedingAmounts[cat.id] || 0; // Wartość karmienia dla kota
							const MIN = 0; // Minimalna wartość
							const MAX = cat.calories_need; // Maksymalna wartość to dzienne zapotrzebowanie kaloryczne

							// Oblicz wartość do normalizacji
							const currentCalories = feedingAmount; // Suma kalorii

							// Użyj funkcji normalizującej
							const normalizedValue = normalize(
								Math.min(currentCalories, MAX), // Ogranicz do MAX
								MIN,
								MAX
							);

							return (
								<Grid item xs={12} sm={6} md={4} key={cat.id}>
									<Card style={{ cursor: "pointer" }}>
										<CardContent>
											<Box
												sx={{ display: "flex", alignItems: "center", mb: 2 }}
											>
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
												Gender: {cat.gender}
											</Typography>
											<Typography color="text.secondary">
												Breed: {cat.breed}
											</Typography>
											<Typography color="text.secondary">
												Daily caloric needs: {cat.calories_need} kcal
											</Typography>
											<Typography color="text.secondary">
												Total calories from feedings: {feedingAmount} kcal
											</Typography>
											<LinearProgress
												variant="determinate"
												value={normalizedValue} // Użyj obliczonej wartości
												sx={{ height: 10, mt: 1 }}
												color={currentCalories >= MAX ? "success" : "primary"}
											/>
											{currentCalories >= MAX && (
												<Box>
													<Typography color="green">
														Your cat is full! Come back tomorrow:)
													</Typography>
													{/* Dodanie przycisku reset */}
													<Button
														variant="contained"
														color="error"
														onClick={() => handleResetFeedings(cat.id)}
														sx={{ mt: 2 }}
													>
														Reset Feedings
													</Button>
												</Box>
											)}
										</CardContent>
										<CardContent>
											<Button
												variant="contained"
												onClick={() => handleAddFeedingClick(cat.id)}
												sx={{ mr: 2 }}
												disabled={currentCalories >= MAX} // Ukryj przycisk, jeśli limit osiągnięty
											>
												Add Feeding
											</Button>
											<Button
												variant="contained"
												onClick={() => handleFeedingHistoryClick(cat.id)}
												sx={{ mr: 2 }}
											>
												Add Day
											</Button>

											{/* Zmiana: Wyświetlanie komunikatu tylko dla konkretnego kota */}
											{feedingMessage[cat.id] && ( // Zmieniono feedingMessage na feedingMessages[cat.id]
												<Typography color="#B0BEC5" sx={{ mt: 1 }}>
													{feedingMessage[cat.id]}{" "}
													{/* Zmieniono na feedingMessages[cat.id] */}
												</Typography>
											)}

											{selectedCatId === cat.id && (
												<AddFeeding
													catId={cat.id} // Przekazujemy ID kota
													onAddSuccess={handleAddFeedingSuccess} // Przekazujemy funkcję
												/>
											)}
											{feedingHistory[cat.id] && (
												<Box mt={2}>
													{feedingHistory[cat.id].map((entry, index) => (
														<Typography key={index}>{entry}</Typography>
													))}
												</Box>
											)}
										</CardContent>
									</Card>
								</Grid>
							);
						})}
					</Grid>
				) : (
					<Typography>No cats found. Add a new cat to get started!</Typography>
				)}
			</Box>
		</Container>
	);
};

export default Dashboard;
