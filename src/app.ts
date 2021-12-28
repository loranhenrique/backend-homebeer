import * as bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router } from '@server';

class App {
  private express: express.Express;
  private port = 3333;

  public constructor() {
    this.express = express();
    this.configureExpressJsonResponse();
    this.addMiddlewares();
    this.addRoutes();
    this.conectarMongoDB();

    this.start();
  }

  public start(): void {
    this.express
      .listen(this.port, () => {
        console.log(`Homebeer rodando na porta ${this.port}`);
      })
      .on('error', (error: Error) => {
        console.log(error.message);
      });
  }

  private configureExpressJsonResponse(): void {
    this.express.set('json replacer', function(key: any, value: any) {
      if (!key) return value;
      return typeof value === 'undefined' ? null : value;
    });
  }

  private addMiddlewares(): void {
    this.express.use(cors({ origin: '*' }));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private addRoutes(): void {
    this.express.use(router);
  }

  private conectarMongoDB(): void {
    mongoose
      .connect('mongodb+srv://loran:homebeer@homebeer.y3yoc.mongodb.net/HomeBeerDB?retryWrites=true&w=majority', {
        socketTimeoutMS: 30000,
        keepAlive: true,
        maxPoolSize: 50,
        autoIndex: false,
        retryWrites: false,
      })
      .then(() => {
        console.log('Homebeer conectado com sucesso ao MongoDB!');
      })
      .catch(error => {
        console.log(error.message, error);
      });

    mongoose.Promise = global.Promise;
  }
}

export default new App();
