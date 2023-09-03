
import { ServiceError, status as StatusCode } from 'grpc';

export class ResponseError implements ServiceError {

    constructor(
        public name: string,
        public message: string,
        public code: StatusCode = StatusCode.INTERNAL
    ) {}

}

export class UnauthorizedError extends ResponseError {
    constructor(message: string) {
        super('Unauthorized', message, StatusCode.PERMISSION_DENIED);
    }
}

export class NotFoundError extends ResponseError {
    constructor(message: string) {
        super('Not Found', message, StatusCode.NOT_FOUND);
    }
}

export class InternalError extends ResponseError {
    constructor(message: string) {
        super('Internal', message, StatusCode.INTERNAL);
    }
}

export class BadRequestError extends ResponseError {
    constructor(message: string) {
        super('Bad Request', message, StatusCode.INVALID_ARGUMENT);
    }
}
