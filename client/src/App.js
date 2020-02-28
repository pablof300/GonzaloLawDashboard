import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import FileComp from "./components/fileComponent/fileComponent"

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/Login" component={FileComp} />
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
