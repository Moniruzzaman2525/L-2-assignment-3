
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import { notFound } from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import cookieParser from 'cookie-parser';
const app: Application = express();
app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send('Server running...!');
});

app.use('/api', router)
app.use(globalErrorHandler)
app.use('*', notFound)

export default app;
