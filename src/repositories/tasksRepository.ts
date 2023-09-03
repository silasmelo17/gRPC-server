
import { injectable } from 'inversify';
import mongoose from 'mongoose';

import { NotFoundError } from '../util/responseError';
import { TasksModel } from '../models/tasksModel';

@injectable()
export class TasksRepository {

    public async listPaginatedTasks(page: number, size: number) {
        const tasks = await TasksModel.find({})
            .skip((page-1) * size)
            .limit(size)
            .lean();

        return tasks;
    }

    public async getTaskById(taskId: string | mongoose.Types.ObjectId) {
        taskId = this.getTaskId(taskId)

        const task = await TasksModel.findById(taskId);
        if (!task) throw new NotFoundError(`Task was not found`);

        return task;
    }

    public async createNewTask(name: string, description: string, reporter: string, done: boolean = false) {
        const task = new TasksModel({
            _id: new mongoose.Types.ObjectId(),
            name, 
            description,
            reporter,
            done,
        });

        await task.save();
        return task;
    }

    public async markTaskAsDone(taskId: string | mongoose.Types.ObjectId, done: boolean = true) {
        taskId = this.getTaskId(taskId);

        const updatedTask = await TasksModel.updateOne(
            { _id: taskId }, 
            { $set: { done } }
        );

        if (updatedTask.matchedCount === 0) throw new NotFoundError(`Task was not found`);
        
        return TasksModel.findById(taskId);
    }

    private getTaskId(taskId: string | mongoose.Types.ObjectId): mongoose.Types.ObjectId {
        if (!mongoose.isValidObjectId(taskId)) throw new NotFoundError(`Task was not found`);
        if (typeof taskId === 'string') {
            return new mongoose.Types.ObjectId(taskId);
        } 

        return taskId;
    }

}
