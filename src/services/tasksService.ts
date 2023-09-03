
import { inject, injectable } from "inversify";
import mongoose from 'mongoose';

import { TasksRepository } from "../repositories/tasksRepository";
import { NotFoundError } from "../util/responseError";

@injectable()
export class TasksService {

    constructor(
        @inject(TasksRepository) protected readonly tasksRepository: TasksRepository,
    ) {}

    public async createTask(name: string, description: string, reporter: string, done: boolean = false) {
        const task = await this.tasksRepository.createNewTask(
            name, 
            description,
            reporter,
            done,
        );

        return {
            id: '' + task._id,
            name: task.name,
            description: task.description,
            done: task.done,
            reporter: task.reporter,
        };
    }

    public async listTasks(page: number = 1, size: number = 20) {
        const tasks = await this.tasksRepository.listPaginatedTasks(page, size);

        return tasks.map( (task) => {
            return {
                id: '' + task._id,
                name: task.name,
                description: task.description,
                reporter: task.reporter,
                done: task.done,
            };
        });
    }

    public async getTaskById(taskId: string | mongoose.Types.ObjectId) {
        const task = await this.tasksRepository.getTaskById(taskId);
        return {
            id: '' + task._id,
            name: task.name,
            description: task.description,
            reporter: task.reporter,
            done: task.done,
        };
    }

    public async markTaskAsDone(taskId: string) {
        const task = await this.tasksRepository.markTaskAsDone(taskId, true);
        if (!task) throw new NotFoundError('Task not found');

        return {
            id: '' + task._id,
            name: task.name,
            description: task.description,
            reporter: task.reporter,
            done: task.done,
        };
    }

}
