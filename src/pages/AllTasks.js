import { useEffect } from "react";
import NoTasksFound from "../components/tasks/NoTasksFound";
import TasksList from "../components/tasks/TasksList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllTasks } from "../lib/api";

const AllTasks = () => {
  const {
    sendRequest,
    status,
    data: loadedTasks,
    error,
  } = useHttp(getAllTasks, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedTasks || loadedTasks.length === 0)) {
    return <NoTasksFound />;
  }

  return <TasksList tasks={loadedTasks} />;
};

export default AllTasks;
