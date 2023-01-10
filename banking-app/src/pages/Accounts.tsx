import React from "react";
import Account from "../features/accounts/Account/Account";

const Accounts: React.FC<any> = () => {
	//dummy data
	const data = [
		{
			id: 0,
			userId: 0,
			type: "savings",
			name: "Personal Savings",
			balance: 12000,
			cashback: 3.14,
		},
		{
			id: 1,
			userId: 0,
			type: "checkings",
			name: "Personal Checkings",
			balance: 24187.96,
			cashback: 3.14,
		},
		{
			id: 2,
			userId: 0,
			type: "savings",
			name: "Joint Savings",
			balance: 5000.84,
			cashback: 3.14,
		},
	];

	return (
		<div className="flex-column">
			{/* mapping through dummy data to account component   */}
			{data.map((account) => (
				<Account key={account.id} data={account} />
			))}
		</div>
	);
};

export default Accounts;
