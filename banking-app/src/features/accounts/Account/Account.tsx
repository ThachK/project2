import React from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";

const Account: React.FC<any> = (props: any) => {
	const navigate = useNavigate();

	const handleClick = () => {
		// navigate to accounts/account id
		navigate(`/accounts/${props.data?.id}`);
	};

	return (
		<div className="account" onClick={handleClick}>
			<div>
				<h3>{props.data?.name}</h3>
				<p className="light-gray italics capitalize">{props.data?.type}</p>
			</div>
			<div>
				<p>${props.data?.balance.toFixed(2)}</p>
			</div>
		</div>
	);
};

export default Account;
