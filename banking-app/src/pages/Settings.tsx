import React, { useRef, useState } from "react";
import "../features/settings/Settings.css";
import Button from "../features/ui/Button/Button";

const Settings: React.FC<any> = () => {
	// address ref
	const [address, setAddress] = useState("123 Example St.");

	// refs for update password section
	const currentPasswordRef = useRef<HTMLInputElement>(null);
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const confirmNewPasswordRef = useRef<HTMLInputElement>(null);

	const handlePasswordChange = (e: any) => {
		// prevent default form submition
		e.preventDefault();

		// get values from the password refs
		const currentPassword = currentPasswordRef.current?.value;
		const newPassword = newPasswordRef.current?.value;
		const confirmNewPassword = confirmNewPasswordRef.current?.value;

		// make sure fields aren't empty
		if (!currentPassword || !newPassword || !confirmNewPassword) {
			alert("Please provide values for all fields.");
		} else {
			// make sure new password and confirmation are the same
			if (newPassword === confirmNewPassword) {
				// make sure new password doesn't match current password
				if (newPassword === currentPassword) {
					alert("New password cannot be your current password.");
				} else {
					// clear the password fields
					currentPasswordRef.current.value = "";
					newPasswordRef.current.value = "";
					confirmNewPasswordRef.current.value = "";

					// TODO: implement logic

					alert("Password has been updated.");
				}
			} else {
				alert("Passwords do not match");
			}
		}
	};

	const handleAddressChange = (e: any) => {
		e.preventDefault();

		if (!address) {
			alert("Please provide an address.");
		} else {
			// TODO: implement logic
			alert("Address has been updated.");
		}
	};

	return (
		<main className="flex-column">
			<div>
				<h2>Settings</h2>
				<p className="gray">
					Manage your account settings and preferences.
				</p>
			</div>
			<section className="settingsSection flex-column">
				<h3>Address</h3>
				<form className="flex-column">
					<div className="flex-row">
						<label htmlFor="homeAddress">Home Address:</label>
						<input
							type="text"
							id="homeAddress"
							value={address}
							onChange={(e: any) => setAddress(e.target.value)}
						/>
						<Button onClick={handleAddressChange}>
							Update Address
						</Button>
					</div>
				</form>
			</section>
			<section className="settingsSection flex-column">
				<h3>Contact Information</h3>
				<form className="flex-column">
					<div className="flex-row">
						<label htmlFor="email">Email:</label>
						<input
							id="email"
							disabled
							type="text"
							value="kimmythach@gmail.com"
						/>
					</div>
					<div className="flex-row">
						<label htmlFor="phoneNumber">Phone Number:</label>
						<input
							id="phoneNumber"
							disabled
							type="text"
							value="(123) 456-7890"
						/>
					</div>
				</form>
			</section>
			<section className="settingsSection flex-column">
				<h3>Change Password</h3>
				<form className="flex-column">
					<div className="flex-row">
						<label htmlFor="currentPassword">
							Current Password:
						</label>
						<input
							type="text"
							id="currentPassword"
							ref={currentPasswordRef}
						/>
					</div>
					<div className="flex-row">
						<label htmlFor="newPassword">New Password:</label>
						<input
							type="text"
							id="newPassword"
							ref={newPasswordRef}
						/>
					</div>
					<div className="flex-row">
						<label htmlFor="confirmNewPassword">
							Confirm New Password:
						</label>
						<input
							type="text"
							id="confirmNewPassword"
							ref={confirmNewPasswordRef}
						/>
					</div>
					<Button onClick={handlePasswordChange}>
						Update Password
					</Button>
				</form>
			</section>
		</main>
	);
};

export default Settings;
