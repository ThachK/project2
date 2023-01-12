import React from "react";
import { useSelector } from "react-redux";
import { getCharges } from "../accounts.slice";
import "./ChargesTable.css";

const ChargesTable: React.FC<any> = () => {
	const charges = useSelector(getCharges);

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
							<td className="bold">${charge?.amount.toFixed(2)}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default ChargesTable;
