import { useEffect, useReducer, useState } from "react";
import tasksReducer from "./reducers/TaskReducer";
import { ITask } from "./utils/interfaces/Task";
import { addTask, getPaginatedTasks } from "./api/TaskAPI";
import { TaskActions } from "./actions/TaskActions";
import { IPagination } from "./utils/interfaces/Pagination";

const INITIAL_STATE: IPagination<ITask> = {
  page: 1,
  totalPages: 1,
  total: 0,
  limit: 10,
  data: [],
};

function App() {
  const LIMIT = 10;
  const [paginatedTasks, dispatch] = useReducer(tasksReducer, INITIAL_STATE);
  const [description, setDescription] = useState("");

  useEffect(() => {
    getPaginatedTasks(paginatedTasks.page, LIMIT).then(
      (paginatedTasksResult: IPagination<ITask>) => {
        dispatch({
          type: TaskActions.FETCHED_TASKS,
          data: paginatedTasksResult,
        });
      },
    );
  }, [paginatedTasks.page]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > paginatedTasks.totalPages) return;

    dispatch({
      type: TaskActions.PAGE_CHANGED,
      page,
    });
  };

  const handleCreateNewTask = () => {
    if (!description) return; // TODO: Show error message

    addTask(description).then((task: ITask) => {
      dispatch({
        type: TaskActions.TASK_CREATED,
        task,
      });
    });
  };

  return (
    <>
      <div>
        <fieldset>
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={() => handleCreateNewTask()}>Create</button>
        </fieldset>
      </div>
      {paginatedTasks.total ? (
        paginatedTasks.data.map((task: ITask) => (
          <div key={task.id}>
            <p>{task.description}</p>
          </div>
        ))
      ) : (
        <span>Could not find any tasks</span>
      )}
      <div>
        <button onClick={() => handlePageChange(paginatedTasks.page - 1)}>
          Previous Page
        </button>
        <span>Page: {paginatedTasks.page}</span>
        <span>Total Tasks: {paginatedTasks.total}</span>
        <button onClick={() => handlePageChange(paginatedTasks.page + 1)}>
          Next Page
        </button>
      </div>
    </>
  );
}

export default App;
