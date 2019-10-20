import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import http from 'http';
import config from './config';
import { PokeController } from './controllers';
import { logger } from './utils';

export default class App {
    private app: Application;

    private connection: http.Server = new http.Server();

    constructor() {
        this.app = express();
        this.applyMiddlewares();

        this.setRoutes();
    }

    public getApp() {
        return this.app;
    }

    public async start() {
        this.connection = this.app.listen(config.port, () => logger.info(`App listening on port ${config.port}`));
        return this;
    }

    public async close() {
        await this.connection.close();
    }

    private applyMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    private setRoutes() {
        // set the poke api routes
        new PokeController(this.app).setRoutes();
    }
}
