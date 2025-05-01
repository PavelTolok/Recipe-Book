import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import recipeRoutes from './controllers/recipe.controller';
import { errorMiddleware } from './middlewares/error.middleware';

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', recipeRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
