import { useEffect } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import { getSingleTask, updateTask } from "../../lib/api";
import TaskForm from "../tasks/TaskForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal";

const TaskUpdate = () => {
  const { taskId } = useSelector((state) => state.show);

  const {
    sendRequest: singleTaskRequest,
    status,
    data: loadedTask,
    error,
  } = useHttp(getSingleTask, true);

  const { sendRequest, error: errorUpdate } = useHttp(updateTask, true);

  useEffect(() => {
    singleTaskRequest(taskId);
  }, [singleTaskRequest, taskId]);

  let print = "";

  if (status === "pending") {
    print = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    print = <p className="centered focused">{error}</p>;
  }

  const changeTaskHandler = async (task) => {
    console.log(loadedTask);
    const taskForUpdate = {
      date: !task.date ? loadedTask.date : task.date,
      name: !task.name ? loadedTask.name : task.name,
      description: !task.description
        ? loadedTask.description
        : task.description,
      priority: !task.priority ? loadedTask.priority : task.priority,
      isDone: loadedTask.isDone,
    };

    console.log(taskForUpdate);

    await sendRequest({ taskForUpdate, id: taskId });
    if (!errorUpdate) {
      window.location.assign("/tasks");
    }
  };

  return (
    <Modal>
      {print === "" ? (
        <TaskForm
          title={`Change Task ${loadedTask.name}`}
          scroll={true}
          onChangeTask={changeTaskHandler}
        />
      ) : (
        print
      )}
    </Modal>
  );
};

export default TaskUpdate;
