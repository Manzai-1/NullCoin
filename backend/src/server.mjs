import { app } from "./app.mjs";
import { errorLogger } from './middleware/errorLogger.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import userRouter from './routes/users-routes.mjs';
import authRouter from './routes/auth-routes.mjs';
import blockchainRoutes from './routes/blockchain-routes.mjs';
import transactionRoutes from './routes/transaction-routes.mjs';
import walletRoutes from './routes/wallet-routes.mjs';
import Blockchain from "./models/blockchain/Blockchain.mjs";
import networkServer from "./network.mjs";
import TransactionPool from "./models/wallet/TransactionPool.mjs";
import AppError from "./models/AppError.mjs";

export const blockchain = new Blockchain();
export const transactionPool = new TransactionPool();
export const server = new networkServer({
  blockchain: blockchain,
  transactionPool,
});

const DEFAULT_PORT = 3002;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;
let NODE_PORT;

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blocks', blockchainRoutes);
app.use('/api/v1/wallet', walletRoutes);
app.use('/api/v1/mempool', transactionRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Resource not found, ${req.originalUrl}`,404));
});

app.use(errorLogger);
app.use(errorHandler);

const synchronize = async () => {
  let response = await fetch(`${ROOT_NODE}/api/v1/blocks`);
  if (response) {
    const result = await response.json();
    blockchain.replaceChain(result.data);
  }

  response = await fetch(`${ROOT_NODE}/api/v1/wallet/transactions`);
  if (response) {
    const result = await response.json();
    transactionPool.replaceMap(result.data);
  }
};

if (process.env.GENERATE_NODE_PORT === 'true') {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
    
    if (PORT !== DEFAULT_PORT) {
      synchronize();
    }
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.shutDown();
  process.exit(1);
});