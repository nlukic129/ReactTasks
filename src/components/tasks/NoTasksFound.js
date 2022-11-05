import { Link } from "react-router-dom";
import classes from "./NoTasksFound.module.css";

const NoTasksFound = () => {
  return (
    <div className={classes.notasks}>
      <p>No tasks found!</p>
      <Link to="/add-task" className="btn">
        Add a Task
      </Link>
    </div>
  );
};

export default NoTasksFound;
