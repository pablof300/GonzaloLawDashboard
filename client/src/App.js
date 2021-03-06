import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/Login/Login";
import PasswordReset from "./views/PasswordReset/passwordReset";
import NotFound from "./views/NotFound";
import FooterComponent from "./components/util/FooterComponent/FooterComponent";
import ClientDashboard from "./components/client/ClientDashboardComponent/ClientDashboard";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import "./views/Login/Login.css";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/passwordreset" component={PasswordReset} />
        <Route exact path="/adminlogin" component={AdminLogin} />
        <Route exact path="/dashboard" component={ClientDashboard} />
        <Route exact path="/admindashboard" component={AdminDashboard} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route component={NotFound} />
      </Switch>
      <footer className="footer">
        <FooterComponent />
      </footer>
    </div>

  );
};

export default App;
