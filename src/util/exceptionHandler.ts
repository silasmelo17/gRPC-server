
import { randomUUID } from 'crypto';
import { Logger } from 'winston';
import {
    ServerUnaryCall,
    sendUnaryData
} from 'grpc';

import { 
    ResponseError,
    InternalError
} from './responseError';
import { createLogger } from './logger';

export function exceptionGRpcHandler() {
    return (_: any, __: string, descriptor: PropertyDescriptor) => {
        const value = descriptor.value;
        descriptor.value = async function(call: ServerUnaryCall<any>, callback: sendUnaryData<any>) {
            // @ts-ignore
            const logger: Logger = this.logger || createLogger();
            const service = this.constructor.name;
            const method = value.name;
            const request = JSON.stringify({ body: call.request, metadata: call.metadata });
            const requestId = randomUUID();

            try {
                logger.info(`Service '${service}' Method '${method}' | Request ${requestId} - PROCESSING ${request}`);

                const result = await value.apply(this, [ call, callback ]);
                const response = JSON.stringify(result);

                logger.info(`Service '${service}' Method '${method}' | Request ${requestId} - RESOLVED ${response}`)

                return callback(null, result);
            } catch (err) {
                const isResponseError = err instanceof ResponseError;
                if (!isResponseError) err = new InternalError('Something is wrong');

                logger.error(`Service '${service}' Method '${method}' | Request ${requestId} - ERROR ${JSON.stringify(err)}`);
                
                return callback(err as ResponseError, null);
            }
        }
    }
}
