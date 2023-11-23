import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.routes';

const app: Application = express();



//parsers
app.use(express.json());
app.use(cors());



//application route
app.use('/api/users', userRoutes); 





app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

export default app;

