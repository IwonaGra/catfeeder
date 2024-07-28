import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //slice reduxa, funkcja asynchroniczna redux
import { supabase } from "../utils/supabase";

export const signIn = createAsyncThunk(
	"auth/signIn", //logowanie
	async ({ email, password }, { rejectWithValue }) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) return rejectWithValue(error.message);
		return data;
	}
);
export const signUp = createAsyncThunk(
	"auth/signUp", //rejestracja
	async ({ email, password }, { rejectWithValue }) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error) return rejectWithValue(error.message);
		return data;
	}
);
export const signOut = createAsyncThunk(
	"auth/signOut", // wylogowanie
	async (_, { rejectWithValue }) => {
		const { error } = await supabase.auth.signOut();
		if (error) return rejectWithValue(error.message);
		return null;
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: { user: null, loading: false, error: null },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.loading = true; // logowanie w toku
			})
			.addCase(signIn.fulfilled, (state, action) => {
				// logowanie wykonane
				state.user = action.payload.user;
				state.loading = false;
				state.error = null;
			})
			.addCase(signIn.rejected, (state, action) => {
				// logowanie odrzucone, błąd
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(signUp.pending, (state) => {
				state.loading = true; // rej w toku
			})
			.addCase(signUp.fulfilled, (state, action) => {
				// wykonana
				state.user = action.payload.user;
				state.loading = false;
				state.error = null;
			})
			.addCase(signUp.rejected, (state, action) => {
				//  odrzucone, błąd
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(signOut.pending, (state) => {
				state.loading = true; // wylogowanie w toku
			})
			.addCase(signOut.fulfilled, (state, action) => {
				// wylogowanie wykonane
				state.user = null;
				state.loading = false;
				state.error = null;
			});
	},
});

export default authSlice.reducer;
