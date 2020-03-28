import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./Components/Main/Navigation";
import Registration from "./Components/Auth/Registration";
import Login from "./Components/Auth/Login";
import Profile from "./Components/Profile/Profile";
import Main from "./Components/Main/Main";

const App = () => {
  return (
    <>
      <Route path="/" component={Navigation} />
      <Route exact path="/" component={Main} />
      <Route path="/register" component={Registration} />
      <Route path="/login" component={Login} />
      <Route path="/profile/" component={Profile} />
    </>
  );
};

export default App;

//redux logic -> accounts, tasks, logged
// tasks into 1 component