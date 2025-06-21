    export const httpRequest = async (endpoint, method, body=null) => {

        const url = 'http://localhost:3000/api/v1/' + endpoint;

        let options = { 
            method: method, 
            headers: { 'Content-Type': 'application/json' }
        };

        if(method === 'POST') options.body = body;

        try {
			const response = await fetch(url, options);
            if(!response.ok) throw new Error(response.status);

            const result = await response.json();
			return {success: true, data: result.data};

		} catch (err) {
			console.error(err);
            return {success: false, error: err};
		}
    }