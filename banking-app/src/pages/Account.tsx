import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	fetchChargesById,
	getCharges,
} from "../features/accounts/accounts.slice";
import { useDispatch } from "react-redux";
import ChargesTable from "../features/accounts/ChargesTable/ChargesTable";
import Button from "../features/ui/Button/Button";

const Account: React.FC<any> = () => {
	//get the account id from url paramater through useParams
	const { id } = useParams();

	const dispatch = useDispatch<any>();

	useEffect(() => {
		dispatch(fetchChargesById(id));
	}, []);

	return (
		<div className="flex-column">
			<Button>Transfer Funds</Button>
			<ChargesTable />
		</div>
	);
};

export default Account;
