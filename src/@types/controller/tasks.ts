
export interface IListTasksRequest {
    page: number;
    limit: number;
};

export interface ITask {
    id?: string;
    name: string;
    description: string;
    done?: boolean;
    reporter: string;
};
