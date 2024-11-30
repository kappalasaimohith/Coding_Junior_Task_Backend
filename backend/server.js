import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './routes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
