
import grpc from 'grpc';

import { Controller } from './controller';

export function gRPCServerFactory(controllers: Controller[]) {
    const server = new grpc.Server();
    for (const controller of controllers) {
        controller.loadService(server);
    }

    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    return server;
}
