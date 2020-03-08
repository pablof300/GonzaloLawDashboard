import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import FileComponent from "./components/fileComponent/fileComponent";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/File" component={FileComponent} />
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
