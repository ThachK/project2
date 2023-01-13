import React from "react";
import "./Dropdown.css";

const Dropdown: React.FC<any> = ({ setValue, options }) => {
	return (
		<select className="dropdown" onChange={(e) => setValue(e.target.value)}>
			{options?.map((option: any, id: any) => {
				return <option key={id}>{option}</option>;
			})}
		</select>
	);
};

export default Dropdown;
