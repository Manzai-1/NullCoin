import { app } from "./app.mjs";
import { errorLogger } from './middleware/errorLogger.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import userRouter from './routes/users-routes.mjs';
import authRouter from './routes/auth-routes.mjs';
import nodeRouter from './routes/node-routes.mjs';

const PORT = process.env.PORT || 3010;

app.use('/api/v1/nodes', nodeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Resource not found, ${req.originalUrl}`,404));
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});