import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { sequelize } from './config/database';
import scraperRoutes from './routes/scrapperRoutes';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import { errorHandler } from './middlewares/errorMiddleware';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api', scraperRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 9000;

async function startServer() {
  try {
    await sequelize.sync();
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
