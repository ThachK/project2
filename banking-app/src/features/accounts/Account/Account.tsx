import React from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";

const Account: React.FC<any> = ({ data }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		// navigate to accounts/account id
		navigate(`/accounts/${data?.accountId}`);
	};

	return (
		<div className="account" onClick={handleClick}>
			<div>
				<h3>{data?.accountName}</h3>
				<p className="light-gray italics capitalize">{data?.accountType}</p>
			</div>
			<div>
				<p>${data?.balance.toFixed(2)}</p>
			</div>
		</div>
	);
};

export default Account;
