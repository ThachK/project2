import React, { useEffect, useState } from "react";

const Settings: React.FC<any> = () => {
	const [theme, setTheme] = useState(
		localStorage.getItem('theme') || 'light'
	);
	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}	;
	useEffect(() => {
		localStorage.setItem('theme', theme);
		document.body.className = theme;
	}, [theme]);
	return (
		<div className={`App ${theme}`}>
			<h1 className = 'settings-header'>Settings</h1>
			<button onClick={toggleTheme}>Select Light/Dark Mode</button>
		</div>
	)
};

export default Settings;
