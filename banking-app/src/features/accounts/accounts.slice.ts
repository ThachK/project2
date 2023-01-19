import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

// define our initial state
const initialState = {
	accounts: [],
	charges: [],
	currentAccount: {},
};

let dummyAccounts: any = [
	{
		id: 0,
		userId: 0,
		type: "savings",
		name: "Personal Savings",
		balance: 0,
	},
	{
		id: 1,
		userId: 0,
		type: "checkings",
		name: "Personal Checkings",
		balance: 0,
	},
	{
		id: 2,
		userId: 0,
		type: "savings",
		name: "Joint Savings",
		balance: 0,
	},
];
let dummyCharges: any = [
	{
		id: 0,
		account_id: 0,
		date: "01/11/2023",
		chargeName: "Chipotle",
		amount: -33.67,
	},
	{
		id: 1,
		account_id: 0,
		date: "01/11/2023",
		chargeName: "Casey's Gas",
		amount: -80.0,
	},
	{
		id: 2,
		account_id: 0,
		date: "01/11/2023",
		chargeName: "7Brew",
		amount: -7.65,
	},
	{
		id: 3,
		account_id: 1,
		date: "01/11/2023",
		chargeName: "QDoba",
		amount: -33.67,
	},
	{
		id: 4,
		account_id: 1,
		date: "01/11/2023",
		chargeName: "Casey's Gas",
		amount: -80.0,
	},
	{
		id: 5,
		account_id: 1,
		date: "01/11/2023",
		chargeName: "Dunkin Donuts",
		amount: -7.65,
	},
	{
		id: 6,
		account_id: 2,
		date: "01/11/2023",
		chargeName: "Taco Bell",
		amount: -33.67,
	},
	{
		id: 7,
		account_id: 2,
		date: "01/11/2023",
		chargeName: "Rapid Roberts Gas",
		amount: -80.0,
	},
	{
		id: 8,
		account_id: 2,
		date: "01/11/2023",
		chargeName: "Starbucks",
		amount: -7.65,
	},
	{
		id: 9,
		account_id: 0,
		date: "01/12/2023",
		chargeName: "Work: Direct Deposit",
		amount: 4000.12,
	},
	{
		id: 10,
		account_id: 2,
		date: "01/12/2023",
		chargeName: "Rent Check",
		amount: 1400,
	},
];
dummyAccounts = dummyAccounts.map((account: any) => {
	let balance = 0;

	let charges = [];
	for (let charge of dummyCharges) {
		if (charge.account_id === account.id) {
			charges.push(charge);
		}
	}

	for (let charge of charges) {
		balance += charge.amount;
	}

	return {
		...account,
		balance,
	};
});

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
			const fromRequest = await axios.post(
				`${BASE_URL}/charges/create/${body?.from}`,
				fromPayload
			);
			const toRequest = await axios.post(
				`${BASE_URL}/charges/create/${body?.to}`,
				toPayload
			);
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
			// const response = await axios.delete(`http://localhost:5000/accounts/${id}`);

			// removing account from dummy data
			const newAccounts = [];
			for (let account of dummyAccounts) {
				if (account.id !== id) {
					newAccounts.push(account);
				}
			}

			dummyAccounts = [...newAccounts];

			dummyAccounts = dummyAccounts.map((account: any) => {
				let balance = 0;

				let charges = [];
				for (let charge of dummyCharges) {
					if (charge.account_id === account.id) {
						charges.push(charge);
					}
				}

				for (let charge of charges) {
					balance += charge.amount;
				}

				return {
					...account,
					balance,
				};
			});

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
	//allows us to get async functions
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
