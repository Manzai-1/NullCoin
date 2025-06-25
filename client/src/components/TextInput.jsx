export const TextInput = ({ text, action }) => {
	return <input type='text' placeholder={text} onChange={action} />;
};