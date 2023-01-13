import React from "react";
import "./TransferModal.css";
import { FiX } from "react-icons/fi";
import Dropdown from "../../ui/Dropdown/Dropdown";
import Button from "../../ui/Button/Button";

const TransferModal: React.FC<any> = ({ setIsModalOpen }) => {
	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<div className="modalWrapper">
			<div className="modal">
				<div className="flex-row-sb mb-1">
					<h2>Transfer Funds</h2>
					<FiX onClick={closeModal} />
				</div>
				<div className="flex-row-sb">
					<h3>From:</h3>
					<Dropdown options={["Personal Savings"]} />
				</div>
				<div className="flex-row-sb">
					<h3>To:</h3>
					<Dropdown
						options={[
							"Personal Checkings ($-121.32)",
							"Joint Savings ($1278.68)",
						]}
					/>
				</div>
				<div className="flex-row-sb">
					<h3>Amount:</h3>
					<input type="number" />
				</div>
				<div className="center mt-1">
					<Button maxWidth>Transfer</Button>
				</div>
			</div>
		</div>
	);
};

export default TransferModal;
