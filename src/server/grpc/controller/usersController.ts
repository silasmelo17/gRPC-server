
import path from 'path';
import { Logger } from 'winston';
import { injectable, inject } from 'inversify';

import {
    ServerUnaryCall,
    sendUnaryData
} from 'grpc';

import { RequestUser } from '../../../@types/controller/users';

import { AbstractController } from './AbstractController';
import { UsersService } from '../../../services';
import {
    exceptionGRpcHandler
} from '../../../util/exceptionHandler';

import { BadRequestError, NotFoundError } from '../../../util/responseError';
import winston from 'winston/lib/winston/config';

@injectable()
export class UsersController extends AbstractController {

    constructor(
        @inject(UsersService) private readonly usersService: UsersService,
        @inject('Logger') private readonly logger: Logger,
    ) {
        super(path.resolve(__dirname, '../proto/users.proto'));
        super.serviceImplementation = {
            createUser: this.createUser.bind(this),
            getUserById: this.getUserById.bind(this),
        };
    }

    @exceptionGRpcHandler()
    protected async createUser(call: ServerUnaryCall<RequestUser>, callback: sendUnaryData<any>) {
        const { name, email, password } = call.request;

        if (!name) throw new BadRequestError('Property name is mandatory');
        if (!email) throw new BadRequestError('Property email is mandatory');
        if (!password) throw new BadRequestError('Property password is mandatory');

        const user = await this.usersService.createUser(name, email, password);
        return {
            id: '' + user._id,
            name: user.name,
            email: user.email,
            createdAt: '' + user.createdAt,
            updatedAt: '' + user.updatedAt
        };
    }

    @exceptionGRpcHandler()
    protected async getUserById (call: ServerUnaryCall<{ id: string }>, callback: sendUnaryData<any>) {
        const { id } = call.request;
        if (!id) throw new NotFoundError('User was not found');

        const user = await this.usersService.getUserById(id);
        return {
            id: '' + user._id,
            name: user.name,
            email: user.email,
            createdAt: '' + user.createdAt,
            updatedAt: '' + user.updatedAt
        };
    }

}
