
import grpc from 'grpc';
import { injectable } from 'inversify';

export interface Controller {
    readonly serviceDefinition: grpc.ServiceDefinition<grpc.UntypedServiceImplementation>;
    serviceImplementation: grpc.UntypedServiceImplementation;
    loadService(server: grpc.Server): void;
}

@injectable()
export class AbstractController implements Controller {

    public readonly serviceDefinition: grpc.ServiceDefinition<grpc.UntypedServiceImplementation>;
    public serviceImplementation: grpc.UntypedServiceImplementation = {};

    constructor(servicePath: string) {
        this.serviceDefinition = grpc.load(servicePath);
    }

    loadService(server: grpc.Server) {
        return server.addService(
            // @ts-ignore
            this.serviceDefinition[this.constructor.name].service,
            this.serviceImplementation
        );
    }

}
