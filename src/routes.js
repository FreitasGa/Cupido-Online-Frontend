import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";

import NotFound from "./pages/notFound";


export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route component={NotFound}/>
    </Switch>
  );
}
