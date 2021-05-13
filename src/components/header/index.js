import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify"

import { useAppContext } from "../../libs/contextLib";

import { SwipeableDrawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import "./styles.css";

export default function Header() {
  const history = useHistory();
  const { userHasAuthenticated, isAuthenticated } = useAppContext();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if ( event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawer(open);
  };

  async function handleLogout() {
    sessionStorage.removeItem("cupido-online/messages");
    await Auth.signOut();

    userHasAuthenticated(false);
    alert("Saiu da conta");
    history.push("/");
  }

  return (
    <div className="Header">
      <Link to="/" className="Logo">
        Cupido Online
      </Link>

      <div className="HeaderLinksWrapper">
        <div className="HeaderLinks" style={{ display: isAuthenticated ? "none" : "flex" }}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="HeaderLinksLogged" style={{ display: isAuthenticated ? "flex" : "none" }}>
          <Link to="/">Inicio</Link>
          <Link to="/messages">Mensagens</Link>
          <button onClick={handleLogout}>Sair</button>
        </div>
      </div>

      <div className="HeaderDrawer">
        <button onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </button>
        <SwipeableDrawer anchor="left" open={drawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
          <p>Cupido Online</p>
          
          <div className="HeaderDrawerLinks" style={{ display: isAuthenticated ? "none" : "flex" }}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          
          <div className="HeaderDrawerLinksLogged" style={{ display: isAuthenticated ? "flex" : "none" }}>
            <Link to="/">Inicio</Link>
            <Link to="/messages">Mensagens</Link>
            <button onClick={handleLogout}>Sair</button>
          </div>
        </SwipeableDrawer>
      </div>
    </div>
  );
}
