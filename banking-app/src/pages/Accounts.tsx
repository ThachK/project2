import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Account from "../features/accounts/Account/Account";
import {
	fetchAccounts,
	getAccountName,
	getAccounts,
	setAccountName,
} from "../features/accounts/accounts.slice";
import { store } from "../features/store/store";

store.dispatch(fetchAccounts());

const Accounts: React.FC<any> = () => {
	// //useDispatch lets us run actions aka functions
	// const dispatch = useDispatch();
	// //useSelector lets us get state aka vairables
	// const accountName = useSelector(getAccountName);

	// const handleClick = () => {
	// 	dispatch(setAccountName("Hamza Kamran"));
	// };

	//create a variable to store accounts from accounts slice
	const accounts = useSelector(getAccounts);

	return (
		<div className="flex-column">
			{/* mapping through dummy data to account component   */}
			{accounts?.map((account: any) => {
				return <Account key={account?.id} data={account} />;
			})}
		</div>
	);
};

export default Accounts;
