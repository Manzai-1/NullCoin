import {TableHead} from './TableHead.jsx';
import {TableRow} from './TableRow.jsx';

export const BlockDiv = ({ blocks }) => {
	return (
		<div>
			{blocks.map((block, blockIndex) => (
				<div className='block-div' key={blockIndex}>
					<h3>Block #{block.block_number}</h3>
					<p>
						<strong>Timestamp:</strong> {block.timestamp}
					</p>
					<p>
						<strong>Hash:</strong> {block.hash}
					</p>

					<table>
						{
							<TableHead
								items={[
									'Tx',
									'From',
									'To',
									'Amount',
								]}></TableHead>
						}
						<tbody>
							{block.transactions.map((tx, index) => (
								<TableRow
									key={index}
									items={[
										tx.tx_number,
										tx.address,
										tx.recipient,
										tx.amount,
									]}></TableRow>
							))}
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
};