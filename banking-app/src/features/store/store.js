import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../accounts/accounts.slice";
import usersReducer from "../users/users.slice";
import toastsReducer from "../toasts/toasts.slice";

export const store = configureStore({
	reducer: {
		accounts: accountsReducer,
		users: usersReducer,
		toasts: toastsReducer,
	},
});
