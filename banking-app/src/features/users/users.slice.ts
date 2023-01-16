import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// define our initial state
const initialState = {
	user: {},
};

// create async thunks
export const login = createAsyncThunk("users/login", async (body: any) => {
	try {
		// const response = axios.post("http://localhost:5000/users/login", body);
		// return response;
		if (
			body?.email === "kimmythach@gmail.com" &&
			body?.password === "password"
		) {
			const user = {
				id: 0,
				firstName: "Kimmy",
				lastName: "Thach",
				email: "kimmythach@gmail.com",
				phoneNumber: "123-456-7890",
				address: "12345 Example Ave.",
			};
			return user;
		}
		return false;
	} catch (err: any) {
		return err.message;
	}
});

// create the user slice
const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUser(state) {
			state.user = JSON.parse(localStorage.getItem("user") || "");
		},
		logout(state) {
			localStorage.setItem("user", JSON.stringify({}));
			state.user = JSON.parse(localStorage.getItem("user") || "");
		},
	},
	extraReducers(builder) {
		builder.addCase(login.fulfilled, (state, action) => {
			localStorage.setItem("user", JSON.stringify(action.payload));
		});
	},
});

// export functions you want to use in the app
export const getUser = (state: any) => state.users.user;

// export actions
export const { setUser, logout } = usersSlice.actions; // eslint-disable-line

// export reducer
export default usersSlice.reducer;
