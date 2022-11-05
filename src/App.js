import { Redirect, Route, Switch } from "react-router-dom";
import AllTasks from "./pages/AllTasks";
import AddTask from "./pages/AddTask";
import Layout from "./components/layout/Layout";
import { useSelector } from "react-redux";
import TaskUpdate from "./components/tasks/TaskUpdate";

function App() {
  const { isShow } = useSelector((state) => state.show);

  return (
    <>
      {isShow && <TaskUpdate />}
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/tasks" />
          </Route>
          <Route path="/tasks">
            <AllTasks />
          </Route>
          <Route path="/add-task">
            <AddTask />
          </Route>
          <Route ptah="*">
            <h1>NotFound</h1>
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
