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
	LinearProgress,
} from "@mui/material";
import AddCat from "./Cat/AddCat";

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

	if (loading) return <Typography>Loading...</Typography>;
	if (error) return <Typography color="error">{error}</Typography>;

	return (
		<Box sx={{ flexGrow: 1, m: 2 }}>
			<Typography variant="h4" gutterBottom>
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
				<Grid container spacing={2}>
					{cats.map((cat) => (
						<Grid item xs={12} sm={6} md={4} key={cat.id}>
							<Card>
								<CardContent>
									<Typography variant="h5">{cat.name}</Typography>
									<Typography color="text.secondary">Age: {cat.age}</Typography>
									<Typography color="text.secondary">
										Daily Caloric Needs: {cat.calories_need} kcal
									</Typography>
								</CardContent>
								<CardActions>
									{/* Tu trzeba dodać jeszcze przyciski do edycji, dodawania karmienia... */}
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			) : (
				<Typography>No cats found. Add a new cat to get started!</Typography>
			)}
		</Box>
	);
};

export default Dashboard;
