import React from "react";
import "../features/home/Home.css";

const Home: React.FC<any> = () => {
	return (
		<div className="home flex-column">
			<div className="home-image">
				<img src={require("../assets/rev_logo.png")} alt="revature_logo"></img>
			</div>
			<div className="home-container">
				<h1 className="welcome-banner">
					Thank you for choosing Revature Bank!
				</h1>
				<br />
				<h3>Please Login or Register to Continue</h3>
			</div>
			<div className="home-animated">
				<img
					src={require("../assets/cred_cards2.gif")}
					alt="animated_credit_cards"
				></img>
			</div>
			<div className="marquee">
				<h3 className="banner-text">
					Start tracking your Revature Points today! Join our cashback reward
					system! Track income and expenses!
				</h3>
				<h3 className="banner-text" style={{ left: 1200 }}>
					Start tracking your Revature Points today! Join our cashback reward
					system! Track income and expenses!
				</h3>
				<h3 className="banner-text" style={{ left: 2400 }}>
					Start tracking your Revature Points today! Join our cashback reward
					system! Track income and expenses!
				</h3>
			</div>
		</div>
	);
};

export default Home;
