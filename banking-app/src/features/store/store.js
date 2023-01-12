import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../accounts/accounts.slice";

export const store = configureStore({
	reducer: {
		accounts: accountsReducer,
	},
});
