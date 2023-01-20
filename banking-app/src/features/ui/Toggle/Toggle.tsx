import React from "react";
import "./Toggle.css";

const Toggle: React.FC<any> = ({ label, toggle, on, off }) => {
	const handleClick = () => {
		if (toggle) {
			off();
		} else {
			on();
		}
	};

	return (
		<div className="toggleWrapper">
			<div
				className="toggleBtn"
				onClick={handleClick}
				style={
					toggle ? { backgroundColor: "blue" } : { backgroundColor: "white" }
				}
			>
				<div
					className="toggleSlider"
					style={
						toggle
							? { transform: "translateX(100%)", backgroundColor: "white" }
							: { backgroundColor: "gray" }
					}
				></div>
			</div>
			<p>{label}</p>
		</div>
	);
};

export default Toggle;
