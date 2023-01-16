import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Account from "../features/accounts/Account/Account";
import {
	fetchAccountsById,
	getAccounts,
} from "../features/accounts/accounts.slice";
import NewAccountModal from "../features/accounts/NewAccountModal/NewAccountModal";
import Button from "../features/ui/Button/Button";
import { getUser, setUser } from "../features/users/users.slice";

const Accounts: React.FC<any> = () => {
	const dispatch = useDispatch<any>();

	const accounts = useSelector(getAccounts);
	const user = useSelector(getUser);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// on component mount, get user from local storage
	useEffect(() => {
		const setUserState = async () => {
			await dispatch(setUser());
		};

		setUserState();
	}, []); // eslint-disable-line

	useEffect(() => {
		const getAccounts = async () => {
			await dispatch(fetchAccountsById(user?.id));
		};

		getAccounts();
	}, [isModalOpen]); // eslint-disable-line

	return (
		<div className="flex-column">
			<Button onClick={() => setIsModalOpen(true)}>
				Add New Account
			</Button>

			{/* mapping through dummy data to account component   */}
			{accounts?.map((account: any) => {
				return <Account key={account?.id} data={account} />;
			})}

			{isModalOpen && <NewAccountModal setIsModalOpen={setIsModalOpen} />}
		</div>
	);
};

export default Accounts;
