
import 'reflect-metadata';

import grpc from 'grpc';
import { getContainer } from './container';

(async () => {
    const container = getContainer();

    const server = container.get(grpc.Server);
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
})();
