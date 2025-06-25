
export const Button = ({ text, action, disable }) => {
	return (
		<button onClick={action} disabled={disable}>
			{text}
		</button>
	);
};