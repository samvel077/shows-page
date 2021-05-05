import { Switch, Route } from "react-router-dom";
import ShowsPage from "./components/ShowsPage/ShowsPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ShowsPage} />
      <Route path="/shows" exact component={ShowsPage} />
    </Switch>
  );
}

export default App;
