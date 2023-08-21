import { injectable } from "inversify";

@injectable()
export class TasksService {

    constructor() {}

    async listTasks() {
        return [];
    }

}
