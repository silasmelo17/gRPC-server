
import grpc from 'grpc';
import mongoose from 'mongoose';
import { Container, interfaces } from "inversify";

import { gRPCServerFactory } from './server/grpc/server'

import { TasksController, UsersController } from "./server/grpc/controller";
import { TasksService, UsersService } from './services';
import { TasksRepository, UsersRepository } from './repositories';
import { createLogger } from './util/logger';

export async function getContainer() {
    const container = new Container();

    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, {
        dbName: process.env.DB_NAME,
        auth: {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        }
    });

    container.bind('Logger').toConstantValue(createLogger());

    container.bind(TasksRepository).to(TasksRepository).inSingletonScope();
    container.bind(UsersRepository).to(UsersRepository).inSingletonScope();

    container.bind(TasksService).to(TasksService).inSingletonScope();
    container.bind(UsersService).to(UsersService).inSingletonScope();

    container.bind(TasksController).to(TasksController).inSingletonScope();
    container.bind(UsersController).to(UsersController).inSingletonScope();

    container.bind(grpc.Server).toDynamicValue(({ container }: interfaces.Context) => {
        return gRPCServerFactory([
            container.get(TasksController),
            container.get(UsersController)
        ]);
    });

    return container;
}
