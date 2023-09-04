
import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';

import { UsersModel } from '../models';
import { NotFoundError } from '../util/responseError';

@injectable()
export class UsersRepository {

    public async createUser(name: string, email: string, password: string) {
        const user = new UsersModel({
            name,
            email,
            password
        });

        await user.save();
        return user;
    }

    public async getUserById(userId: string | mongoose.Types.ObjectId) {
        userId = this.getUserId(userId);

        const user = await UsersModel.findById(userId).lean();
        if (!user) throw new NotFoundError('User was not found');

        return user;
    }

    private getUserId(taskId: string | mongoose.Types.ObjectId): mongoose.Types.ObjectId {
        if (!mongoose.isValidObjectId(taskId)) throw new NotFoundError(`Task was not found`);
        if (typeof taskId === 'string') {
            return new mongoose.Types.ObjectId(taskId);
        } 

        return taskId;
    }

}
