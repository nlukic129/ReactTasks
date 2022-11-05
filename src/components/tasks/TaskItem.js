import { useDispatch } from "react-redux";
import { showUpdateActions } from "../../store/showUpdateSlice";
import classes from "./TaskItem.module.css";

const TaskItem = (props) => {
  const dispatch = useDispatch();

  const openModalHandler = () => {
    dispatch(showUpdateActions.show(props.id));
  };

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  const doneHandler = () => {
    props.onDone(props.id);
  };

  return (
    <li key={props.id} className={classes.item}>
      <div className={classes.mainData}>
        <figure>
          <blockquote>{props.name}</blockquote>
          <figcaption>Name</figcaption>
        </figure>
        <figure>
          <blockquote>{props.deadline}</blockquote>
          <figcaption>Deadline date</figcaption>
        </figure>
        <figure>
          <blockquote>{props.priority}</blockquote>
          <figcaption>Priority</figcaption>
        </figure>
        <figure>
          <button className="btn" onClick={openModalHandler}>
            Change Task
          </button>
        </figure>
        <figure>
          {!props.isDone ? (
            <button className="btn" onClick={doneHandler}>
              Done
            </button>
          ) : (
            <p>Task is done</p>
          )}
        </figure>
      </div>
      <figure>
        <figcaption>Description:</figcaption>
        <blockquote>{props.description}</blockquote>
      </figure>
      <figure>
        <button className={classes.delete} onClick={deleteHandler}>
          Delete
        </button>
      </figure>
    </li>
  );
};

export default TaskItem;
