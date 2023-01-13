import React from "react";
import "./AccountHeader.css";

const AccountHeader: React.FC<any> = (props: any) => {
	return (
		<section className="accountHeader">
			<div>
				<h2>{props?.account?.name}</h2>
				<p className="light-gray italics capitalize">{props?.account?.type}</p>
			</div>
			<div>
				<h3>${props?.account?.balance?.toFixed(2)}</h3>
			</div>
		</section>
	);
};

export default AccountHeader;
