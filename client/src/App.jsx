import { useState } from 'react';
import './App.css';
import { useRef } from 'react';

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
	const [transaction, setTransaction] = useState({
		recipient: undefined,
		amount: undefined
	});

	const handleUpdatePort = (e) => {
		e.preventDefault();
		console.log('UPDATED PORT');
	};

	const handleRegisterUser = async () => {
		try {
			const response = await fetch(
				`http://localhost:${port}/api/v1/users`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: user.username,
						password: user.password,
						role: user.role,
					}),
				}
			);

			if (!response.ok) {
				console.error('Error: ', response);
			} else {
				await handleLoginUser();
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleLoginUser = async () => {
		try {
			const response = await fetch(
				`http://localhost:${port}/api/v1/auth`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: user.username,
						password: user.password,
					}),
				}
			);

			const result = await response.json();

			if (!response.ok) {
				console.error('Error: ', response);
			}

			setUser({ ...user, token: result.data.token });
		} catch (err) {
			console.error(err);
		}
	};

	const handleUpdateWallet = async () => {
		try {
			const response = await fetch(
				`http://localhost:${port}/api/v1/wallet/info`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'bearer ' + user.token,
					},
				}
			);

			const result = await response.json();

			if (!response.ok) {
				console.error('Error: ', response);
			}

			setUser({
				...user,
				address: result.data.address,
				balance: result.data.balance,
			});
		} catch (err) {
			console.error(err);
		}
	};

	const handleTransaction = async () => {
		try {
			const response = await fetch(
				`http://localhost:${port}/api/v1/wallet/transactions`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'bearer ' + user.token,
					},
					body: JSON.stringify({
						recipient: transaction.recipient,
						amount: transaction.amount,
					}),
				}
			);

			if (!response.ok) {
				console.error('Error: ', response);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleUpdateMemPool = async () => {
		try {
			const response = await fetch(
				`http://localhost:${port}/api/v1/wallet/transactions`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'bearer ' + user.token,
					},
				}
			);

			const result = await response.json();

			if (!response.ok) {
				console.error('Error: ', response);
			} else {
				console.log('TX RESULT: ', result);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleMine = async () => {
		try {
			await fetch(
				`http://localhost:${port}/api/v1/wallet/transactions/mine`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'bearer ' + user.token,
					},
				}
			);

			await handleUpdateMemPool();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<nav>
				<div className='port-div'>
					<form className='port-form' onSubmit={handleUpdatePort}>
						<input
							type='text'
							defaultValue={port}
							onChange={(e) => {
								setPort(e.target.value);
							}}
						/>
						<button type='submit'>Update Port</button>
					</form>
				</div>

				<div className='login-div'>
					{user.token ? (
						<>
							<input
								type='text'
								value={user.token ? user.token : ''}
								disabled={true}
							/>
							<button
								className='login-button'
								onClick={() => {
									setUser({});
								}}>
								{'Logout'}
							</button>
						</>
					) : (
						<div>
							<input
								type='text'
								defaultValue={user.username}
								placeholder='username'
								onChange={(e) => {
									setUser({
										...user,
										username: e.target.value,
									});
								}}
							/>
							<input
								type='text'
								defaultValue={user.password}
								placeholder='password'
								onChange={(e) => {
									setUser({
										...user,
										password: e.target.value,
									});
								}}
							/>
							<input
								type='text'
								defaultValue={user.role}
								placeholder='role'
								onChange={(e) => {
									setUser({ ...user, role: e.target.value });
								}}
							/>
							<button
								className='login-button'
								onClick={handleRegisterUser}>
								Register
							</button>

							<button
								className='login-button'
								onClick={handleLoginUser}>
								Login
							</button>
						</div>
					)}
				</div>
			</nav>

			<main>
				<section className='wallet-section'>
					<h2>Wallet</h2>
					<div>
						{/* <label>{`Address: ${user.address ? `${user.address.slice(0, 6)}...${user.address.slice(-4)}` : 'N/A'}`}</label> */}
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
					<div>
						<input
							type='text'
							placeholder='Recipient'
							disabled={user.token ? false : true}
							required
							onChange={(e) => {
								setTransaction({
									...transaction,
									recipient: e.target.value
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
									amount: e.target.value
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
				</section>
			</main>
		</>
	);
}

export default App;
