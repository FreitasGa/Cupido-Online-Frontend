import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth } from "aws-amplify";

import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";

import Routes from "./routes";

import "./styles.css";

export default function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (err) {
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
