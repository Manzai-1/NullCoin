import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import dotenv from 'dotenv';
import { xss } from 'express-xss-sanitizer';

process.on('uncaughtException', (err)=>{
  console.log('Critical system failure, server shutting down.');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config/config.env' });

const limiter = rateLimit({
  max: process.env.RATE_LIMIT_COUNT,
  windowMs: process.env.RATE_LIMIT_WINDOW,
  message: 'Rate Limit Exceeded.',
});

const app = express();

app.use(helmet());
app.use(cors());
app.use('/api/', limiter);
app.use(express.json({ limit: '100kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

export { app };

