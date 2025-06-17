import { app } from "./app.mjs";

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