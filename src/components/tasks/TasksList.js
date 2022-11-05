import { useHistory, useLocation } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import TaskItem from "./TaskItem";
import classes from "./TasksList.module.css";
import { deleteTask, updateTask } from "../../lib/api";

const sortTasks = (tasks, ascending) => {
  return tasks.sort((taskA, taskB) => {
    if (ascending) {
      return taskA.id > taskB.id ? 1 : -1;
    } else {
      return taskA.id < taskB.id ? 1 : -1;
    }
  });
};

const TasksList = (props) => {
  const location = useLocation();
  const history = useHistory();

  const queryPatams = new URLSearchParams(location.search);

  const { sendRequest: deleteTaskRequest } = useHttp(deleteTask, true);
  const { sendRequest: updateTaskRequest } = useHttp(updateTask, true);

  let isSortingAscending;
  if (!queryPatams.get("sort")) {
    isSortingAscending = true;
  } else {
    isSortingAscending = queryPatams.get("sort") === "asc";
  }

  const sortedTasks = sortTasks(props.tasks, isSortingAscending);

  const changeSortingHandler = () => {
    history.replace({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "dsc" : "asc"}`,
    });
  };

  const deleteTaskHandler = async (id) => {
    await deleteTaskRequest(id);
    window.location.assign("/tasks");
  };

  const doneTaskHandler = (id) => {
    const task = sortedTasks.find((task) => task.id === id);
    task.isDone = true;
    const taskForUpdate = {
      date: task.date,
      description: task.description,
      isDone: task.isDone,
      name: task.name,
      priority: task.priority,
    };
    updateTaskRequest({ id, taskForUpdate });
  };

  return (
    <>
      <div className={classes.sorting}>
        <h1>All Tasks</h1>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            name={task.name}
            description={task.description}
            priority={task.priority}
            deadline={task.date}
            isDone={task.isDone}
            onDelete={deleteTaskHandler}
            onDone={doneTaskHandler}
          />
        ))}
      </ul>
    </>
  );
};

export default TasksList;
