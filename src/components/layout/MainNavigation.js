import { Link, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} to="/tasks">
        React Tasks
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/tasks">
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/add-task">
              Add Task
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
