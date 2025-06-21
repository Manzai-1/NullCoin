import NetworkServer from './network.mjs';
import Blockchain from './models/blockchain/Blockchain.mjs';

process.on('uncaughtException', (err)=>{
  console.log('Critical system failure, server shutting down.');
  console.log(err.name, err.message);
  process.exit(1);
});

const blockchain = new Blockchain();
const networkServer = new NetworkServer(blockchain);

networkServer.listen();

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  networkServer.close(() => process.exit(1));
});

