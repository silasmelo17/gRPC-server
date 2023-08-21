
import path from 'path';
import { injectable, inject } from 'inversify';

import {
    ServerUnaryCall,
    sendUnaryData
} from 'grpc';

import { AbstractController } from './AbstractController';
import { TasksService } from '../../../services';

@injectable()
export class TasksController extends AbstractController {

    constructor(
        @inject(TasksService) private readonly tasksService: TasksService,
    ) {
        super(path.resolve(__dirname, '../proto/tasks.proto'));
        super.serviceImplementation = {
            listTasks: this.listTasks.bind(this),
            getTaskById: this.getTaskById.bind(this),
            markTaskAsDone: this.getTaskById.bind(this)
        };
    }

    protected async listTasks (call: ServerUnaryCall<any>, callback: sendUnaryData<any>) {
        return callback(null, [{
            id: "1",
            description: "2",
            done: false,
            reporter: "Silas"
        }]);
    }

    protected async getTaskById (call: ServerUnaryCall<any>, callback: sendUnaryData<any>) {
        return callback(null, {
            ok: true,
        });
    }

    protected async markTaskAsDone (call: ServerUnaryCall<any>, callback: sendUnaryData<any>) {
        return callback(null, {
            ok: true,
        });
    }

}
