const taskStates = ['new', 'active', 'done'] as const;
type TaskState = typeof taskStates[number];

export type Task = {
    title: string;
    description: string;
    status: TaskState;
};
