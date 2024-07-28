import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchCats } from "../../features/catSlice";
// import { Box, Typography, CircularProgress } from "@mui/material";

const CatDetail = () => {
	// const { id } = useParams();
	// const dispatch = useDispatch();
	// const { cats, loading, error } = useSelector((state) => state.cats);
	// const cat = cats.find((cat) => cat.id === parseInt(id));

	// useEffect(() => {
	// 	if (!cat) {
	// 		dispatch(fetchCats());
	// 	}
	// }, [dispatch, cat]);

	// if (loading) return <CircularProgress />;
	// if (error) return <Typography color="error">{error}</Typography>;
	// if (!cat) return <Typography>Cat not found</Typography>;

	return (
		// <Box sx={{ p: 2 }}>
		// 	<Typography variant="h4" gutterBottom>
		// 		{cat.name}
		// 	</Typography>
		// 	<Typography variant="body1">Age: {cat.age}</Typography>
		// 	<Typography variant="body1">Breed: {cat.breed}</Typography>
		// 	<Typography variant="body1">
		// 		Daily Caloric Needs: {cat.calories_need} kcal
		// 	</Typography>
		// 	{cat.photo_url && (
		// 		<img
		// 			src={cat.photo_url}
		// 			alt={cat.name}
		// 			style={{ maxWidth: "100%", marginTop: "10px" }}
		// 		/>
		// 	)}
		// </Box>
	);
};

export default CatDetail;
