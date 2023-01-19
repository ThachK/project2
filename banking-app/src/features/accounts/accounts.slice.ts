import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

// define our initial state
const initialState = {
	accounts: [],
	charges: [],
	currentAccount: {},
};

const getFormattedDate = () => {
	const currentDate = new Date();
	const month = currentDate.getMonth() + 1;
	const day = currentDate.getDate();
	const year = currentDate.getFullYear();
	return month + "/" + day + "/" + year;
};

//create async thunks
export const transferMoney = createAsyncThunk(
	"accounts/transfer",
	async (body: any) => {
		try {
			const fromPayload = {
				chargeAmount: -body?.amount,
				chargeName: `Transfer to account #${body?.to}`,
				date: getFormattedDate(),
			};
			const toPayload = {
				chargeAmount: body?.amount,
				chargeName: `Transfer from account #${body?.from}`,
				date: getFormattedDate(),
			};
			await axios.post(`${BASE_URL}/charges/create/${body?.from}`, fromPayload);
			await axios.post(`${BASE_URL}/charges/create/${body?.to}`, toPayload);
			return true;
		} catch (err: any) {
			return err.message;
		}
	}
);
export const deleteAccount = createAsyncThunk(
	"accounts/deleteAccount",
	async (id: any) => {
		try {
			await axios.delete(`${BASE_URL}/accounts/delete/${id}`);
			return true;
		} catch (err: any) {
			return err.message;
		}
	}
);
export const createNewAccount = createAsyncThunk(
	"accounts/createAccount",
	async (body: any) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/accounts/create/${body?.userId}`,
				{
					accountType: body?.type,
					accountName: body?.name,
					balance: body?.balance,
				}
			);
			return response.data;
		} catch (err: any) {
			return err.message;
		}
	}
);
export const fetchAccountById = createAsyncThunk(
	"accounts/fetchAccountById",
	async (id: any) => {
		try {
			const response = await axios.get(`${BASE_URL}/accounts/account/${id}`);
			return response.data;
		} catch (err: any) {
			return err.message;
		}
	}
);
export const fetchAccountsById = createAsyncThunk(
	"accounts/fetchAccountsById",
	async (id: any) => {
		if (id) {
			try {
				const response = await axios.get(`${BASE_URL}/accounts/user/${id}`);
				return response.data;
			} catch (err: any) {
				return err.message;
			}
		}
	}
);
export const fetchChargesById = createAsyncThunk(
	"accounts/fetchCharges",
	async (id: any) => {
		try {
			const response = await axios.get(`${BASE_URL}/charges/account/${id}`);
			return response.data;
		} catch (err: any) {
			return err.message;
		}
	}
);
export const calculateAccountBalance = createAsyncThunk(
	"accounts/calculateBalance",
	async (account: any) => {
		try {
			// get charges by id
			const response = await axios.get(
				`${BASE_URL}/charges/account/${account?.accountId}`
			);
			const charges = response.data;

			// calculate balance
			let balance = 0;
			for (const charge of charges) {
				balance += charge?.chargeAmount;
			}

			// update balance in account
			const payload = {
				accountId: account?.accountId,
				user: account?.user,
				accountType: account?.accountType,
				accountName: account?.accountName,
				balance,
			};
			await axios.put(
				`${BASE_URL}/accounts/update/${account?.accountId}`,
				payload
			);

			return true;
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
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchAccountsById.fulfilled, (state, action) => {
				state.accounts = action.payload;
			}) //gets executed if successful
			.addCase(fetchChargesById.fulfilled, (state, action) => {
				state.charges = action.payload;
			})
			.addCase(fetchAccountById.fulfilled, (state, action) => {
				state.currentAccount = action.payload;
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
export const getCurrentAccount = (state: any) => {
	return state.accounts.currentAccount;
};

// export actions
export const {} = accountsSlice.actions; //eslint-disable-line

//export reducer
export default accountsSlice.reducer;
