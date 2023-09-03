
import 'reflect-metadata';

import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, './.env') });

import grpc from 'grpc';
import { getContainer } from './container';

(async () => {
    const container = await getContainer();

    const server = container.get(grpc.Server);
    server.bind(`0.0.0.0:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure());
    server.start();
})();
