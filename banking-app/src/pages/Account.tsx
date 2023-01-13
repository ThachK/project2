import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	fetchAccountById,
	fetchChargesById,
	getCurrentAccount,
} from "../features/accounts/accounts.slice";
import { useDispatch, useSelector } from "react-redux";
import ChargesTable from "../features/accounts/ChargesTable/ChargesTable";
import Button from "../features/ui/Button/Button";
import Dropdown from "../features/ui/Dropdown/Dropdown";
import AccountHeader from "../features/accounts/AccountHeader/AccountHeader";
import TransferModal from "../features/accounts/TransferModal/TransferModal";

const Account: React.FC<any> = () => {
	//get the account id from url paramater through useParams
	const { id } = useParams();
	const currentAccount = useSelector(getCurrentAccount);

	const dispatch = useDispatch<any>();

	const [filter, setFilter] = useState("All Charges");
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		dispatch(fetchAccountById(id));
		dispatch(fetchChargesById(id));
	}, []);

	return (
		<div className="flex-column">
			<AccountHeader account={currentAccount} />
			<div className="flex-row-sb">
				<Dropdown
					options={["All Charges", "Debits", "Credits"]}
					setValue={setFilter}
				/>
				<Button onClick={() => setIsModalOpen(true)}>Transfer Funds</Button>
			</div>
			<ChargesTable filter={filter} />
			{isModalOpen && <TransferModal setIsModalOpen={setIsModalOpen} />}
		</div>
	);
};

export default Account;
