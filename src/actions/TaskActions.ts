import { IPagination } from "../utils/interfaces/Pagination";
import { ITask } from "../utils/interfaces/Task";

export enum TaskActions {
  FETCHED_TASKS = "FETCHED_TASKS",
  PAGE_CHANGED = "PAGE_CHANGED",
  TASK_CREATED = "TASK_CREATED",
}

export type FetchAction = {
  type: TaskActions.FETCHED_TASKS;
  data: IPagination<ITask>;
};

export type PageAction = {
  type: TaskActions.PAGE_CHANGED;
  page: number;
};

export type AddAction = {
  type: TaskActions.TASK_CREATED;
  task: ITask;
};
