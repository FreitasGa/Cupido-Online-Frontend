import { SwipeableDrawer } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import logo from "../../assets/g841.png";

export default function Header(props) {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <div className="Header">
      <Link to="/" className="Logo">
        Cupido Online
      </Link>

      <div className="HeaderLinks">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

      <div className="HeaderDrawer">
        <button onClick={toggleDrawer(true)}>Menu</button>
        <SwipeableDrawer
          anchor="left"
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <img alt="Cupido Online" src={logo} />
          <div className="HeaderDrawerLinks">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </SwipeableDrawer>
      </div>
    </div>
  );
}
