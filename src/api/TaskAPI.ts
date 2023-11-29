import { IPagination } from "../utils/interfaces/Pagination";
import { ITask } from "../utils/interfaces/Task";

const TASKS: ITask[] = [
  {
    id: 1,
    description: "Task 1",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    description: "Task 2",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function getPaginatedTasks(
  page: number = 1,
  limit: number = 10,
): Promise<IPagination<ITask>> {
  console.log("Getting paginated tasks...");
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = 100;

      resolve({
        data: TASKS,
        page,
        limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      });
    }, 1_000);
  });
}

export function addTask(description: string): Promise<ITask> {
  console.log("Adding task...");
  return new Promise((resolve) => {
    setTimeout(() => {
      const task: ITask = {
        id: TASKS.length + 1,
        description,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      resolve(task);
    }, 1_000);
  });
}
