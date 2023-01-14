import React, { useEffect, useState } from "react";
import '../darkMode.css'

const Settings: React.FC<any> = () => {
	const [theme, setTheme] = useState(
		localStorage.getItem('theme') || 'light'
	);
	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else if (theme === 'dark'){
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
			<button className = 'mode-button' onClick={toggleTheme}>Select Light/Dark Mode</button>
		</div>
	)
};

export default Settings;
