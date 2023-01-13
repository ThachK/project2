import { all } from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCharges } from "../accounts.slice";
import "./ChargesTable.css";

const ChargesTable: React.FC<any> = ({ filter = "" }) => {
	const allCharges = useSelector(getCharges);
	const [charges, setCharges] = useState(allCharges);

	useEffect(() => {
		setCharges(allCharges);
	}, [allCharges]);

	useEffect(() => {
		if (filter === "Debits") {
			//get all debits
			setCharges(allCharges.filter((charge: any) => charge?.amount >= 0));
		} else if (filter === "Credits") {
			//get all credits
			setCharges(allCharges.filter((charge: any) => charge?.amount < 0));
		} else {
			setCharges(allCharges);
		}
	}, [filter]);
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
						<tr key={charge?.id}>
							<td>{charge?.date}</td>
							<td className="italics">{charge?.chargeName}</td>
							<td
								style={
									charge?.amount > 0
										? { color: "#27ae60" }
										: { color: "#e74c3c" }
								}
								className="bold"
							>
								${Math.abs(charge?.amount)?.toFixed(2)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default ChargesTable;
