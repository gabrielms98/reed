import { AddAction, FetchAction, PageAction, TaskActions } from "../actions/TaskActions";
import { IPagination } from "../utils/interfaces/Pagination";
import { ITask } from "../utils/interfaces/Task";

export type Action = FetchAction | PageAction | AddAction;

export default function tasksReducer(
  paginatedTasks: IPagination<ITask>,
  action: Action,
) {
  switch (action.type) {
    case TaskActions.FETCHED_TASKS: {
      const { data, page, totalPages, total, limit } = action.data;
      return {
        ...paginatedTasks,
        page,
        totalPages,
        total,
        limit,
        data,
      };
    }

    case TaskActions.PAGE_CHANGED: {
      return {
        ...paginatedTasks,
        page: action.page,
      };
    }

    case TaskActions.TASK_CREATED: {
      return {
        ...paginatedTasks,
        data: [action.task, ...paginatedTasks.data],
      };
    }

    default:
      throw new Error("Invalid action type");
  }
}
