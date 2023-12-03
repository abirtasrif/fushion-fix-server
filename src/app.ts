import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';

// MAIN FILE
class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.configMiddlewares();
    this.setUpRoutes();
    this.connectToDatabase();
  }

  private configMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(mongoSanitize);
    this.app.use(helmet());
    this.app.use(hpp());
  }

  private setUpRoutes(): void {}
  private connectToDatabase(): void {}
}
