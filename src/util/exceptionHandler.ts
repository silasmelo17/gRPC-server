
import {
    ServerUnaryCall,
    sendUnaryData
} from 'grpc';

import { 
    ResponseError,
    InternalError
} from './responseError';

export function exceptionGRpcHandler() {
    return (_: any, __: string, descriptor: PropertyDescriptor) => {
        const value = descriptor.value;
        descriptor.value = async function(call: ServerUnaryCall<any>, callback: sendUnaryData<any>) {
            try {
                const result = await value.apply(this, [ call, callback ]);
                return callback(null, result);
            } catch (err) {
                if (err instanceof ResponseError) {
                    return callback(err, null);
                }
                
                return callback(new InternalError('Something is wrong'), null);
            }
        }
    }
}
