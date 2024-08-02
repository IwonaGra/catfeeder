import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../utils/supabase";

export const fetchFeedings = createAsyncThunk(
	"feedings/fetchFeedings",
	async (catId, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase
				.from("feedings")
				.select("*")
				.eq("cat_id", catId) // Filtruj po cat_id
				.order("timestamp", { ascending: false });
			if (error) throw error;
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const addFeeding = createAsyncThunk(
	"feedings/addFeeding",
	async (feeding, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase
				.from("feedings")
				.insert(feeding)
				.single();
			if (error) throw error;
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const resetFeedings = createAsyncThunk(
	"feedings/resetFeedings",
	async (catId, { rejectWithValue }) => {
		try {
			// Usuń wszystkie karmienia dla danego kota
			const { error } = await supabase
				.from("feedings")
				.delete()
				.eq("cat_id", catId);
			if (error) throw error;
			return catId;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const feedingSlice = createSlice({
	name: "feedings",
	initialState: {
		feedings: [],
		loading: false,
		error: null,
	},
	reducers: {
		// Dodajemy reducer do dodawania karmienia do lokalnego stanu
		addFeedingToHistory: (state, action) => {
			state.feedings.push(action.payload); // Dodaj karmienie do historii
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFeedings.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchFeedings.fulfilled, (state, action) => {
				state.feedings = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchFeedings.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addFeeding.fulfilled, (state, action) => {
				state.feedings.unshift(action.payload);
			})
			.addCase(resetFeedings.fulfilled, (state, action) => {
				// Usuń wszystkie karmienia dla danego kota z Redux store
				state.feedings = state.feedings.filter(
					(feeding) => feeding.cat_id !== action.payload
				);
			});
	},
});
export const { addFeedingToHistory } = feedingSlice.actions;
export default feedingSlice.reducer;
