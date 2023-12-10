export const TaskStatuses = ['new', 'active', 'done'] as const;
export type TaskStatus = typeof TaskStatuses[number];

export type Task = {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
};
