
import grpc from 'grpc';
import mongoose from 'mongoose';
import { Container, interfaces } from "inversify";

import { TasksController } from "./server/grpc/controller";
import { gRPCServerFactory } from './server/grpc/server'
import { TasksService } from './services';

import { TasksRepository } from './repositories/tasksRepository';

export async function getContainer() {
    const container = new Container();

    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, {
        dbName: process.env.DB_NAME,
        auth: {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        }
    });

    container.bind(TasksService).to(TasksService).inSingletonScope();
    container.bind(TasksRepository).to(TasksRepository).inSingletonScope();
    container.bind(TasksController).to(TasksController).inSingletonScope();

    container.bind(grpc.Server).toDynamicValue(({ container }: interfaces.Context) => {
        const controller = container.get(TasksController);
        return gRPCServerFactory([controller]);
    });

    return container;
}
