import { useEffect, useState } from 'react';
import './App.css';
import { httpFetch } from './services/http.mjs';
import { LoginModal } from './components/LoginModal.jsx';
import {BlockDiv} from './components/BlockDiv.jsx';
import {Button} from './components/Button.jsx';
import {TableHead} from './components/TableHead.jsx';
import {TableRow} from './components/TableRow.jsx';

function App() {
	const [port, setPort] = useState(3002);
	const [user, setUser] = useState({
		username: undefined,
		password: undefined,
		role: undefined,
		token: undefined,
		address: undefined,
		balance: undefined,
	});
	const [showLoginModal, setShowLoginModal] = useState(false);

	const [transaction, setTransaction] = useState({
		recipient: undefined,
		amount: undefined,
	});

	const [memPool, setMemPool] = useState([]);
	const [userTxs, setUserTxs] = useState([]);
	const [userBlocks, setUserBlocks] = useState([]);
	const [chain, setChain] = useState([]);

	useEffect(()=>{
		if(!user.token) return;

		const updateUI = async () => {
			await handleUpdateWallet();
			await handleWalletHistory();
			await handleUpdateMemPool();
			await handleUpdateChain();
		}

		updateUI();
	},[user.token]);

	const updatePassword = (e) => {
		setUser({
			...user,
			password: e.target.value,
		});
	};
	const updateUsername = (e) => {
		setUser({
			...user,
			username: e.target.value,
		});
	};
	const updateRole = (e) => {
		setUser({
			...user,
			role: e.target.value,
		});
	};

	const handleRegisterUser = async () => {
		const result = await httpFetch({
			port,
			endpoint: 'users',
			method: 'POST',
			body: {
				username: user.username,
				password: user.password,
				role: user.role,
			},
		});

		if (result.ok) {
			await handleLoginUser();
		} else {
			alert(result.data);
		}
	};

	const handleLoginUser = async () => {
		const result = await httpFetch({
			port,
			endpoint: 'auth',
			method: 'POST',
			body: {
				username: user.username,
				password: user.password,
			},
		});

		if (result.ok) {
			setUser((user)=>({ ...user, token: result.data.token }));
		} else {
			alert(result.data);
		}
	};

	const handleUpdateWallet = async () => {
		const result = await httpFetch({
			port,
			endpoint: 'wallet',
			method: 'GET',
			auth: `bearer ${user.token}`,
		});

		if (result.ok) {
			setUser({
				...user,
				address: result.data.address,
				balance: result.data.balance,
			});
		} else {
			alert(result.data);
		}
	};

	const handleWalletHistory = async () => {
		const result = await httpFetch({
			port,
			endpoint: 'wallet/history',
			method: 'GET',
			auth: `bearer ${user.token}`,
		});

		if (result.ok) {
			setUserTxs(result.data.transactions);
			setUserBlocks(result.data.minedBlocks);
		} else {
			alert(result.data);
		}
	};

	const handleTransaction = async () => {
		const result = await httpFetch({
			port,
			endpoint: 'wallet',
			method: 'POST',
			auth: `bearer ${user.token}`,
			body: {
				recipient: transaction.recipient,
				amount: transaction.amount,
			},
		});

		if (result.ok) {
			await handleUpdateMemPool();
		} else {
			alert(result.data);
		}
	};

	const handleUpdateMemPool = async () => {
		const result = await httpFetch({
			port,
			endpoint: 'mempool',
			method: 'GET',
			auth: `bearer ${user.token}`,
		});

		if (result.ok) {
			setMemPool(result.data);
		} else {
			alert(result.data);
		}
	};

	const handleMine = async () => {
		const result = await httpFetch({
			port,
			endpoint: 'mempool/mine',
			method: 'GET',
			auth: `bearer ${user.token}`,
		});

		if (result.ok){
			await handleUpdateWallet();
			await handleWalletHistory();
			await handleUpdateMemPool();
			await handleUpdateChain();
		} else{ 
			alert(result.data)
		};
	};

	const handleUpdateChain = async () => {
		const result = await httpFetch({
			port,
			endpoint: 'blocks',
			method: 'GET',
			auth: `bearer ${user.token}`,
		});

		if (result.ok) {
			setChain(result.data);
		} else {
			alert(result.data);
		}
	};

	return (
		<>
			<nav>
				<div className='port-div'>
					<input
						type='text'
						defaultValue={port}
						onChange={(e) => {
							setPort(e.target.value);
						}}
					/>
					<button type='submit'>Update Port</button>
				</div>

				<div className='login-div'>
					{user.token ? (
						<>
							<input
								type='text'
								value={user.token}
								disabled={true}
							/>
							<Button
								text='Logout'
								action={() => {
									setUser({});
								}}
								disable={false}
							/>
						</>
					) : (
						<>
							<Button
								text='Login / Register'
								disable={false}
								action={() => {
									setShowLoginModal(true);
								}}
							/>
							{showLoginModal && (
								<LoginModal
									updateUsername={updateUsername}
									updatePassword={updatePassword}
									updateRole={updateRole}
									handleRegisterUser={handleRegisterUser}
									handleLoginUser={handleLoginUser}
									onClose={() => {
										setShowLoginModal(false);
									}}
								/>
							)}
						</>
					)}
				</div>
			</nav>

			<main>
				<section className='wallet-section'>
					<h2>Wallet</h2>
					<div>
						<label>{`Address: ${
							user.address ? user.address : 'N/A'
						}`}</label>
					</div>
					<div>
						<label>{`Balance: ${
							user.address ? user.balance : 'N/A'
						} $Nulls`}</label>
					</div>
					<button
						className='login-button'
						disabled={user.token ? false : true}
						onClick={handleUpdateWallet}>
						{'Refresh'}
					</button>
				</section>

				<section className='transaction-section'>
					<h2>Transaction</h2>
					<div className='transaction-div'>
						<input
							type='text'
							placeholder='Recipient'
							disabled={user.token ? false : true}
							required
							onChange={(e) => {
								setTransaction({
									...transaction,
									recipient: e.target.value,
								});
							}}
						/>
						<input
							type='text'
							placeholder='Amount'
							disabled={user.token ? false : true}
							required
							onChange={(e) => {
								setTransaction({
									...transaction,
									amount: e.target.value,
								});
							}}
						/>
						<button
							onClick={handleTransaction}
							disabled={user.token ? false : true}>
							Send
						</button>
					</div>
				</section>

				<section className='mempool-section'>
					<h2>Transaction Pool</h2>
					<button
						onClick={handleUpdateMemPool}
						disabled={user.token ? false : true}>
						Refresh Table
					</button>
					<button
						onClick={handleMine}
						disabled={user.token ? false : true}>
						Mine Transactions
					</button>
					<table>
						<TableHead
							items={[
								'timestamp',
								'from',
								'to',
								'amount',
							]}></TableHead>
						<tbody>
							{memPool.map((tx, index) => (
								<TableRow
									key={index}
									items={[
										tx.timestamp,
										tx.address,
										tx.recipient,
										tx.amount,
									]}></TableRow>
							))}
						</tbody>
					</table>
				</section>

				<section className='history-section'>
					<h2>Wallet History</h2>
					<button
						onClick={handleWalletHistory}
						disabled={user.token ? false : true}>
						Refresh History
					</button>

					<h3>Transaction History</h3>
					<table>
						<TableHead
							items={[
								'timestamp',
								'from',
								'to',
								'amount',
							]}></TableHead>
						<tbody>
							{userTxs.map((tx, index) => (
								<TableRow
									key={index}
									items={[
										tx.timestamp,
										tx.address,
										tx.recipient,
										tx.amount,
									]}></TableRow>
							))}
						</tbody>
					</table>
					<h3>Mining History</h3>
					{<BlockDiv blocks={userBlocks}></BlockDiv>}
				</section>
				<section className='chain-section'>
					<h2>NullCoin Chain</h2>
					<button
						onClick={handleUpdateChain}
						disabled={user.token ? false : true}>
						Refresh NullCoin Chain
					</button>
					{<BlockDiv blocks={chain}></BlockDiv>}
				</section>
			</main>
		</>
	);
}

export default App;
