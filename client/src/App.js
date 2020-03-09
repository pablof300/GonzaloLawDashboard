import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import "./views/Login/Login.css";
import NotFound from "./views/NotFound";
import NavBar from "./components/util/NavBarComponent/NavBar";
import ProgBarComponent from "./components/client/ProgBarComponent/ProgCard";
import FooterComponent from "./components/util/FooterComponent/FooterComponent";
import ClientDashboard from "./components/client/ClientDashboardComponent/ClientDashboard";
import FileComponent from "./components/client/FileComponent/FileComponent"
import AdminDashboard from "./components/admin/AdminComponents/AdminDashboard"

const App = () => {
  return (
    
    <div>
      
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/dashboard" component={ClientDashboard} />
        <Route exact path="/Admin" component={AdminDashboard} />
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
        <Route component={NotFound} />
      </Switch>
      <footer>
        <FooterComponent />
      </footer>
    </div>
  );
};

export default App;
