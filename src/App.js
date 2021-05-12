import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth } from "aws-amplify";

import Routes from "./routes";
import { AppContext } from "./libs/contextLib";

import "./styles.css";
import { onError } from "./libs/errorLib";

export default function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      console.log("here");
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (err) {
      console.log(err);
      if (err !== "No current user") {
        onError(err);
      }
    }
  }

  return (
    <Router>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </Router>
  );
}
