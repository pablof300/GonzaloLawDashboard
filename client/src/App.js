import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Footer/Footer"
import ClientDashboard from "./components/ClientDashboard";
import bodyParser from "body-parser";

const App = () => {
  return (
    
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Test" component={ClientDashboard} />
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
        <Route component={NotFound} />
      </Switch>
      
      
      <footer className="footer">
        <Footer />
      </footer>
      
  
    </div>
    
      
       
      
  );
};

export default App;
