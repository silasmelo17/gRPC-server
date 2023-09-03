
import path from 'path';
import { injectable, inject } from 'inversify';

import {
    ServerUnaryCall,
    sendUnaryData
} from 'grpc';

import { 
    IListTasksRequest, 
    ITask 
} from '../../../@types/controller/tasks';

import { AbstractController } from './AbstractController';
import { TasksService } from '../../../services';
import {
    exceptionGRpcHandler
} from '../../../util/exceptionHandler';

import { BadRequestError } from '../../../util/responseError';

@injectable()
export class TasksController extends AbstractController {

    constructor(
        @inject(TasksService) private readonly tasksService: TasksService,
    ) {
        super(path.resolve(__dirname, '../proto/tasks.proto'));
        super.serviceImplementation = {
            createTask: this.createTask.bind(this),
            listTasks: this.listTasks.bind(this),
            getTaskById: this.getTaskById.bind(this),
            markTaskAsDone: this.markTaskAsDone.bind(this)
        };
    }

    @exceptionGRpcHandler()
    protected async createTask(call: ServerUnaryCall<ITask>, callback: sendUnaryData<any>) {
        const { name, description, done, reporter } = call.request;

        if (!name) throw new BadRequestError('Property name is mandatory');
        if (!description) throw new BadRequestError('Property description is mandatory');
        if (!reporter) throw new BadRequestError('Property reporter is mandatory');

        return this.tasksService.createTask(name, description, reporter, done);
    }

    @exceptionGRpcHandler()
    protected async listTasks (call: ServerUnaryCall<IListTasksRequest>, callback: sendUnaryData<any>) {
        let { page, limit } = call.request;

        if (!page) page = 1;
        if (!limit) limit = 20;

        return this.tasksService.listTasks(page, limit);
    }

    @exceptionGRpcHandler()
    protected async getTaskById (call: ServerUnaryCall<{ id: string }>, callback: sendUnaryData<ITask>) {
        const { id } = call.request;
        return this.tasksService.getTaskById(id);
    }

    @exceptionGRpcHandler()
    protected async markTaskAsDone (call: ServerUnaryCall<{ id: string }>, callback: sendUnaryData<ITask>) {
        const { id } = call.request;
        return this.tasksService.markTaskAsDone(id);
    }

}
