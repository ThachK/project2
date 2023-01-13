import React from "react";
import "./Button.css";

const Button: React.FC<any> = (props: any) => {
	return (
		<button
			style={props?.maxWidth && { width: "100%" }}
			onClick={props.onClick}
			className="btn"
		>
			{props.children}
		</button>
	);
};

export default Button;
