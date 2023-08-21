
import grpc from 'grpc';
import { Container, interfaces } from "inversify";

import { AbstractController } from "./server/grpc/controller/AbstractController";
import { TasksController } from "./server/grpc/controller";
import { gRPCServerFactory } from './server/grpc/server'
import { TasksService } from './services';

export function getContainer() {
    const container = new Container();

    container.bind(TasksService).to(TasksService);

    container.bind(TasksController).to(TasksController);

    container.bind(grpc.Server).toDynamicValue(({ container }: interfaces.Context) => {
        const controller = container.get(TasksController);
        return gRPCServerFactory([controller]);
    });

    return container;
}
