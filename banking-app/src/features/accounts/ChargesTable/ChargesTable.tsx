import React, { useEffect, useState } from "react";
import "./ChargesTable.css";

const ChargesTable: React.FC<any> = ({ filter = "", allCharges }) => {
	const [charges, setCharges] = useState(allCharges);

	useEffect(() => {
		setCharges(allCharges);
	}, [allCharges]); //eslint-disable-line

	useEffect(() => {
		if (filter === "Debits") {
			//get all debits
			setCharges(allCharges.filter((charge: any) => charge?.chargeAmount >= 0));
		} else if (filter === "Credits") {
			//get all credits
			setCharges(allCharges.filter((charge: any) => charge?.chargeAmount < 0));
		} else {
			setCharges(allCharges);
		}
	}, [filter]); //eslint-disable-line
	return (
		<table className="chargesTable">
			<thead>
				<tr>
					<td>Date</td>
					<td>Charge</td>
					<td>Amount</td>
				</tr>
			</thead>
			<tbody>
				{charges?.map((charge: any) => {
					return (
						<tr key={charge?.chargeId}>
							<td>{charge?.date}</td>
							<td className="italics">{charge?.chargeName}</td>
							<td
								style={
									charge?.chargeAmount > 0
										? { color: "#27ae60" }
										: { color: "#e74c3c" }
								}
								className="bold"
							>
								${Math.abs(charge?.chargeAmount)?.toFixed(2)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default ChargesTable;
