import { WebSocket, WebSocketServer } from 'ws';


const SOCKET_PORT = process.env.SOCKET_PORT || 3002;

const NODES = process.env.MEMBER_NODES
	? process.env.MEMBER_NODES.split(',')
	: [];

export default class Network {
	constructor(blockchain, server) {
		this.blockchain = blockchain;
        this.server = server;
		this.nodes = [];
	}

	listen() {
		console.log('SOCKET_PORT: ', SOCKET_PORT);

		const server = new WebSocketServer({ port: SOCKET_PORT });

        server.on('connection', (socket) => this.connectNode(socket));

        this.connectNodes();

        console.log(`Lyssnar på anslutningar på socket ${SOCKET_PORT}`);
	}

    connectNodes(){
        NODES.forEach(node => {
            const socket = new WebSocket(node);
            socket.on('open', ()=> this.connectNode(socket))
        })
    }

    connectNode(socket){
        this.nodes.push(socket);
        console.log('connected node');

        this.messageHandler(socket);

        socket.send(JSON.stringify(this.blockchain));
    }

    messageHandler(socket){
        socket.on('message', message => {
            const data = JSON.parse(message);
            this.blockchain.replaceChain(data.chain);
            console.log('Blockchain: ', data);
        });
    }

    broadcastChain(){
        this.nodes.forEach(socket => socket.send(JSON.stringify(this.blockchain)));
    }
}
