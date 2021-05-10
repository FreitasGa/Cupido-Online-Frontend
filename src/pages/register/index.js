import { TextField } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Register() {
  return (
    <div className="Register">
      <div className="RegisterHeader">
        <Link to="/" className="Logo">
          Cupido Online
        </Link>
      </div>
      <div className="RegisterBody">
        <div className="RegisterWrapper">
          <h2>Register</h2>
          <form className="RegisterCard">
            <TextField id="standard-basic" placeholder="Nome" />
            <TextField id="standard-basic" placeholder="Email" type="email" />
            <TextField id="standard-basic" placeholder="Senha" type="password" />
            <TextField id="standard-basic" placeholder="Confirme a senha" type="password" />
            <input className="RegisterCardSubmit" type="submit" value="Criar conta" />
          </form>
          <Link to="/login">Entre com email</Link>
        </div>
      </div>
    </div>
  );
}
