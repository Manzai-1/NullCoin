
export const TableRow = ({ items }) => {
	return (
		<tr>
			{items.map((item, index) => (
				<td key={index}>{item}</td>
			))}
		</tr>
	);
};