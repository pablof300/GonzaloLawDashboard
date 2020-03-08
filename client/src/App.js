import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import "./views/Login/Login.css";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Footer/Footer";
import ClientDashboard from "./components/ClientDashboard";
import FileComponent from "./components/fileComponent/fileComponent"

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
      <footer>
        <Footer />
      </footer>
    </div>    
  );
};

export default App;
