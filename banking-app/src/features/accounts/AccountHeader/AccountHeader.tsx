import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
// import { deleteAccount } from "../accounts.slice";
import "./AccountHeader.css";

const AccountHeader: React.FC<any> = (props: any) => {
	// const dispatch = useDispatch<any>();
	const [redirect, setRedirect] = useState(false); // eslint-disable-line

	// const handleDelete = async () => {
	// 	const response = prompt(
	// 		"Please type 'delete' to confirm account deletion (this action is irreversible!)"
	// 	);
	// 	if (response === "delete") {
	// 		await dispatch(deleteAccount(props?.account?.id));
	// 		alert("Account succesfully deleted! Redirecting...");
	// 		setRedirect(true);
	// 	}
	// };

	return (
		<section className="accountHeader">
			{redirect && <Navigate to="/accounts" replace={true} />}
			<div>
				<h2>{props?.account?.accountName}</h2>
				<p className="light-gray italics capitalize">
					{props?.account?.accountType}
				</p>
				{/* <Link onClick={handleDelete} to="">
					Delete Account
				</Link> */}
			</div>
			<div>
				<h3>${props?.account?.balance?.toFixed(2)}</h3>
			</div>
		</section>
	);
};

export default AccountHeader;
