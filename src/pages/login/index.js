import { TextField } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Login() {
  return (
    <div className="Login">
      <div className="LoginHeader">
        <Link to="/" className="Logo">
          Cupido Online
        </Link>
      </div>
      <div className="LoginBody">
        <div className="LoginWrapper">
          <h2>Login</h2>
          <form className="LoginCard">
            <TextField id="standard-basic" placeholder="Email" type="email" />
            <TextField id="standard-basic" placeholder="Senha" type="password" />
            <button>Esqueci a Senha</button>
            <input className="LoginCardSubmit" type="submit" value="Entrar" />
          </form>
          <Link to="/register">Crie uma conta</Link>
        </div>
      </div>
    </div>
  );
}
