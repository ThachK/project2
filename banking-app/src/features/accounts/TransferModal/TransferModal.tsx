import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Dropdown from "../../ui/Dropdown/Dropdown";
import Button from "../../ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchAccountsById,
	getAccounts,
	getCurrentAccount,
	transferMoney,
} from "../accounts.slice";

const TransferModal: React.FC<any> = ({ setIsModalOpen }) => {
	const dispatch = useDispatch<any>();
	const accounts = useSelector(getAccounts);
	const currentAccount = useSelector(getCurrentAccount);
	const [transferAmount, setTransferAmount] = useState(0);

	// get an array of accounts that are not current account
	const getOtherAccounts = () => {
		const otherAccounts = [];
		for (let account of accounts) {
			account?.id !== currentAccount?.id &&
				otherAccounts.push(account?.name);
		}
		return otherAccounts;
	};

	// form data
	const [fromArr, setFromArr] = useState([currentAccount?.name]); //eslint-disable-line
	const [toArr, setToArr] = useState(getOtherAccounts());
	const [toAccount, setToAccount] = useState<any>();

	// when toArr is loaded, set initial toAccount to first item
	useEffect(() => {
		setToAccount(toArr[0]);
	}, [toArr]); //eslint-disable-line

	// get accounts from api
	useEffect(() => {
		const getAccounts = async () => {
			await dispatch(fetchAccountsById(0));
		};

		getAccounts();
	}, []); //eslint-disable-line

	// when accounts are loaded in, getOtherAccounts()
	useEffect(() => {
		setToArr(getOtherAccounts());
	}, [accounts]); //eslint-disable-line

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleTransfer = async () => {
		if (!transferAmount) {
			alert("Please provide a transfer amount.");
		} else {
			if (transferAmount <= 0) {
				alert("Please provide an amount greater than $0");
			} else {
				const transferAmt = Number(Number(transferAmount).toFixed(2));
				let fromAccountId = currentAccount?.id;
				let toAccountId = 0;

				for (let account of accounts) {
					if (account?.name === toAccount) {
						toAccountId = account?.id;
					}
				}

				try {
					const body = {
						from: fromAccountId,
						to: toAccountId,
						amount: transferAmt,
					};
					await dispatch(transferMoney(body));

					alert(
						`Transferred $${transferAmt} from ${fromArr} to ${toAccount}.`
					);
					setIsModalOpen(false);
				} catch (err: any) {
					alert("Unable to transfer money: " + err.message);
				}
			}
		}
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
					<Dropdown options={fromArr} />
				</div>
				<div className="flex-row-sb">
					<h3>To:</h3>
					<Dropdown setValue={setToAccount} options={toArr} />
				</div>
				<div className="flex-row-sb">
					<h3>Amount:</h3>
					<input
						value={transferAmount}
						onChange={(e: any) => setTransferAmount(e.target.value)}
						type="number"
					/>
				</div>
				<div className="mt-1">
					<Button onClick={handleTransfer} maxWidth>
						Transfer
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TransferModal;
