import React from "react";
import { Switch, Route } from "react-router-dom";

import { useAppContext } from "./libs/contextLib";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Messages from "./pages/messages";
import ForgotPassword from "./pages/forgotPassword";
import EditPassword from "./pages/editPassword";
import Match from "./pages/match";

import NotFound from "./pages/notFound";

export default function Routes() {
  const { isAuthenticated } = useAppContext();

  function PrivateRoute({ component: Component, ...rest}) {
    return (
      <Route {...rest} render={(props) => {
        return isAuthenticated ? <Component {...props}/> : <NotFound/>
      }} />
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <PrivateRoute exact path="/messages" component={Messages} />
      <PrivateRoute exact path="/edit-password" component={EditPassword} />
      <Route path="/messages/:id/match/:match" component={Match} />
      <Route component={NotFound}/>
    </Switch>
  );
}
