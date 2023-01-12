import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// define our initial state
const initialState = {
	accounts: [],
	charges: [],
	accountName: "Kimmy Kamran",
};

//create async thunks
export const fetchAccounts = createAsyncThunk(
	//allows us to get async functions
	"accounts/fetchAccounts",
	async () => {
		try {
			// const response = axios.get("http://localhost:5000/accounts");
			// return response.data;
			const dummyData = [
				{
					id: 0,
					userId: 0,
					type: "savings",
					name: "Personal Savings",
					balance: 12000,
					cashback: 3.14,
				},
				{
					id: 1,
					userId: 0,
					type: "checkings",
					name: "Personal Checkings",
					balance: 24187.96,
					cashback: 3.14,
				},
				{
					id: 2,
					userId: 0,
					type: "savings",
					name: "Joint Savings",
					balance: 5000.84,
					cashback: 3.14,
				},
			];
			return dummyData;
		} catch (err: any) {
			return err.message;
		}
	}
);

export const fetchChargesById = createAsyncThunk(
	"accounts/fetchCharges",
	async (id: any) => {
		try {
			const dummyData = [
				{
					id: 0,
					account_id: 0,
					date: "01/11/2023",
					chargeName: "Chipotle",
					amount: 33.67,
				},
				{
					id: 1,
					account_id: 0,
					date: "01/11/2023",
					chargeName: "Casey's Gas",
					amount: 80.0,
				},
				{
					id: 2,
					account_id: 0,
					date: "01/11/2023",
					chargeName: "7Brew",
					amount: 7.65,
				},
				{
					id: 3,
					account_id: 1,
					date: "01/11/2023",
					chargeName: "QDoba",
					amount: 33.67,
				},
				{
					id: 4,
					account_id: 1,
					date: "01/11/2023",
					chargeName: "Casey's Gas",
					amount: 80.0,
				},
				{
					id: 5,
					account_id: 1,
					date: "01/11/2023",
					chargeName: "Dunkin Donuts",
					amount: 7.65,
				},
				{
					id: 6,
					account_id: 2,
					date: "01/11/2023",
					chargeName: "Taco Bell",
					amount: 33.67,
				},
				{
					id: 7,
					account_id: 2,
					date: "01/11/2023",
					chargeName: "Rapid Roberts Gas",
					amount: 80.0,
				},
				{
					id: 8,
					account_id: 2,
					date: "01/11/2023",
					chargeName: "Starbucks",
					amount: 7.65,
				},
			];

			let results = [];
			for (let charge of dummyData) {
				if (charge.account_id === Number(id)) {
					results.push(charge);
				}
			}
			return results;
		} catch (err: any) {
			return err.message;
		}
	}
);

//create the account slice
const accountsSlice = createSlice({
	name: "accounts",
	initialState,
	//reducers allow us to modify state using functions
	//not a function to GET data, but rather MODIFY data
	reducers: {
		setAccountName(state, action) {
			state.accountName = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchAccounts.fulfilled, (state, action) => {
				state.accounts = action.payload;
			}) //gets executed if successful
			.addCase(fetchChargesById.fulfilled, (state, action) => {
				state.charges = action.payload;
			});
	},
});

// export functions you want to use in the app
export const getAccounts = (state: any) => {
	return state.accounts.accounts;
};
export const getCharges = (state: any) => {
	return state.accounts.charges;
};

export const getAccountName = (state: any) => {
	return state.accounts.accountName;
};

// export actions
export const { setAccountName } = accountsSlice.actions;

//export reducer
export default accountsSlice.reducer;