import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./AccountHeader.css";

const AccountHeader: React.FC<any> = (props: any) => {
	// const dispatch = useDispatch<any>();
	const [redirect, setRedirect] = useState(false); // eslint-disable-line

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
