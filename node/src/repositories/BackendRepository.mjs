export default class BackendRepository {
	// async createLogin(username, password) {
	// 	try {
	// 		const response = await fetch('http://localhost:3000/api/v1/users/', {
	// 			method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ username, password, role: 'node' })
	// 		});

    //         if(!response.ok) throw new Error(response.status);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// }

    // async setJWT(username, password) {
    //     try {
	// 		const response = await fetch('http://localhost:3000/api/v1/auth/', {
	// 			method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ username, password })
	// 		});

    //         if(!response.ok) throw new Error(response.status);
    //         const data = await response.json();
	// 		this.#token = data.data.token;

	// 	} catch (err) {
	// 		console.error(err);
	// 	}
    // }

	// async listNodes() {}

	// async registerNode() {}

	async uploadChain(chain) {}
}
