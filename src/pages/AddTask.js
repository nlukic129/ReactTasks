import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm";
import useHttp from "../hooks/use-http";
import { addTask } from "../lib/api";

const AddTask = () => {
  const { sendRequest, status, error } = useHttp(addTask);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      if (!error) {
        window.location.assign("/tasks");
      }
    }
  }, [status, history, error]);

  const addTaskHandler = (task) => {
    sendRequest(task);
  };

  return (
    <TaskForm title={"Add Task"} scroll={false} onAddTask={addTaskHandler} />
  );
};

export default AddTask;
