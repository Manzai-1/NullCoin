export const httpFetch = async ({
    port,
	endpoint,
	method,
	auth = undefined,
	body = undefined
}) => {
    const url = `http://localhost:${port}/api/v1/${endpoint}`;

    const headers = { 'Content-Type': 'application/json' };
    if(auth) headers.authorization = auth;

    const options = {
        method,
        headers,
    }

    if(body) options.body = JSON.stringify(body);

	try {
		const raw = await fetch(url, options);
        const response = await raw.json();

		if (raw.ok) {
            return result(true, response.data);
        }
        
        throw new Error(`${response.statusCode} ${response.message}`);
	} catch (err) {        
		return result(false, err);
	}
};

const result = (ok, data) => { return {ok, data} };
