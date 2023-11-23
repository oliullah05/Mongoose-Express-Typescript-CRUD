import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import { studentRoutes } from './app/modules/student/3-stunent.routes';
const app: Application = express();



//parsers
app.use(express.json());
app.use(cors());

//application route
// app.use('/api/v1/students', studentRoutes); //api/v1/students/create-student

// const getAController = (req: Request, res: Response)=>{
//   const a=10;
//   res.send(a)
//   }
// app.get("/",getAController)

app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

export default app;
// console.log(process.cwd());
