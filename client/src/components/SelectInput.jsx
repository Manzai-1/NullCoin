
export const SelectInput = ({ options, action }) => {
	return (
		<select onChange={action}>
			{options.map((option) => (
				<option>{option}</option>
			))}
		</select>
	);
};