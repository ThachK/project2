import React from "react";
import { useParams } from "react-router-dom";

const Account: React.FC<any> = () => {
	//get the account id from url paramater through useParams
	const { id } = useParams();

	return (
		<div>
			<h1>Account #{id}</h1>
		</div>
	);
};

export default Account;
