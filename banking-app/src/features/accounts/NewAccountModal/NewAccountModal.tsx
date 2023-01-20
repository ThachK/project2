import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../../toasts/toasts.slice";
import Button from "../../ui/Button/Button";
import Dropdown from "../../ui/Dropdown/Dropdown";
import { getUser } from "../../users/users.slice";
import { createNewAccount } from "../accounts.slice";

const NewAccountModal: React.FC<any> = ({ setIsModalOpen }) => {
	const dispatch = useDispatch<any>();
	const user = useSelector(getUser);

	// user inputs
	const [accountType, setAccountType] = useState("Savings");
	const [accountName, setAccountName] = useState("");

	const [options, setOptions] = useState(["Savings", "Checkings"]); // eslint-disable-line

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const createAccount = async () => {
		if (!accountName || !accountType) {
			dispatch(
				addToast({
					status: "warning",
					message: "Please enter an account name and type.",
				})
			);
		} else {
			// create body to send to api endpoint
			const body = {
				userId: user?.userId,
				name: accountName,
				type: accountType,
				balance: 0,
			};

			// try to create new account
			try {
				await dispatch(createNewAccount(body));
				dispatch(
					addToast({
						status: "success",
						message: "Account has been created.",
					})
				);
			} catch (err: any) {
				console.log(err.message);
				dispatch(
					addToast({
						status: "error",
						message: "Unable to create account.",
					})
				);
			}

			// close the modal
			setIsModalOpen(false);
		}
	};

	return (
		<div className="modalWrapper">
			<div className="modal">
				<div className="flex-row-sb mb-1">
					<h2>Create New Account</h2>
					<FiX onClick={closeModal} />
				</div>
				<div className="flex-row-sb">
					<h3>Account Type:</h3>
					<Dropdown options={options} setValue={setAccountType} />
				</div>
				<div className="flex-row-sb">
					<h3>Account Name:</h3>
					<input
						value={accountName}
						type="text"
						onChange={(e) => setAccountName(e.target.value)}
					/>
				</div>
				<div className="mt-1">
					<Button onClick={createAccount} maxWidth>
						Create New Account
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NewAccountModal;
