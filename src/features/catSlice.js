import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../utils/supabase";

export const fetchCats = createAsyncThunk(
	"cats/fetchCats", //pobiera koty z bazy)
	async (_, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase.from("cats").select("*");
			console.log("Fetched data:", data);
			if (error) throw error;
			return data;
		} catch (error) {
			console.error("Error fetching cats:", error); // walidacja
			return rejectWithValue(error.message);
		}
	}
);

export const addCat = createAsyncThunk(
	"cats/addCat", //dodaje koty do bazy
	async (cat, { rejectWithValue }) => {
		try {
			const {
				data: { user },
				error: userError,
			} = await supabase.auth.getUser();
			if (userError) throw userError;
			console.log("Current user:", user);

			if (!user) {
				throw new Error("User not authenticated"); // walidacja - sprawdza czy user jest zalogowany
			}
			console.log(`Attempting to add cat:`, cat);

			const { data, error } = await supabase
				.from("cats")
				.insert([{ ...cat, user_id: user.id }])
				.select();
			console.log("Supabase response:", data, error);
			if (error) throw error;
			if (!data || data.length === 0)
				throw new Error("No data returned from Supabase"); // dodana walidacja przy braku danych z bazy
			return data[0];
		} catch (error) {
			console.error("Error fetching cats:", error);
			return rejectWithValue(error.message);
		}
	}
);

export const updateCat = createAsyncThunk(
	"cats/updateCat", // funkcja aktualizacji danych kota
	async ({ id, updatedCat }, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase
				.from("cats")
				.update(updatedCat)
				.eq("id", id)
				.select();
			if (error) throw error;
			return data[0];
		} catch (error) {
			console.error("Error updating cat:", error); // walidacja
			return rejectWithValue(error.message);
		}
	}
);

export const fetchCatBreeds = createAsyncThunk(
	"cats/fetchCatBreeds",
	async (_, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase
				.from("cat_breeds") // nazwa tabeli
				.select("*");
			if (error) throw error;
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const catSlice = createSlice({
	name: "cats",
	initialState: { cats: [], loading: false, error: null },
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCats.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCats.fulfilled, (state, action) => {
				state.cats = action.payload;
				state.loading = false;
			})
			.addCase(fetchCats.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(addCat.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addCat.fulfilled, (state, action) => {
				state.cats.push(action.payload);
				state.loading = false;
			})
			.addCase(addCat.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(updateCat.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCat.fulfilled, (state, action) => {
				const index = state.cats.findIndex(
					(cat) => cat.id === action.payload.id
				);
				if (index !== -1) {
					state.cats[index] = action.payload;
				}
				state.loading = false;
			})
			.addCase(updateCat.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			});
	},
});

export const { clearError } = catSlice.actions;
export default catSlice.reducer;
