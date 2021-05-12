import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";

import { TextField } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import "./styles.css";

export default function Register() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      name.length > 0 && 
      email.length > 0 && 
      password.length > 0 &&
      password === confirmPassword
    );
  }

  function validateConfirmationForm() {
    return confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          name: name,
        }
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (err) {
      console.log(err);
      onError(err);
      setIsLoading(false)
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);

      userHasAuthenticated(true);
      history.push("/");
    } catch (err) {
      console.log(err);
      onError(err);
      setIsLoading(false);
    }
  }

  function registerForm() {
    return (
      <div className="RegisterWrapper">
        <h2>Registro</h2>
        <form className="RegisterCard" onSubmit={handleSubmit}>
          <TextField id="standard-basic" placeholder="Nome" autoFocus onChange={(e) => setName(e.target.value)} />
          <TextField id="standard-basic" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
          <TextField id="standard-basic" placeholder="Senha" type="password" onChange={(e) => setPassword(e.target.value)} />
          <TextField id="standard-basic" placeholder="Confirme a senha" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
          <input className="RegisterCardSubmit" type="submit" value="Criar conta" disabled={!validateForm()}/>
        </form>
        <Link to="/login">Entre com email</Link>
      </div>
    );
  }

  function confirmationForm() {
    return (
      <div className="RegisterWrapper">
        <h2>Confirme o código</h2>
        <form className="RegisterCard" onSubmit={handleConfirmationSubmit}>
          <p>Verifique o o código que foi enviado ao seu email</p>
          <TextField id="standard-basic" placeholder="Código" autoFocus onChange={(e) => setConfirmationCode(e.target.value)} />
          <input className="RegisterCardSubmit" type="submit" value="Verificar" disabled={!validateConfirmationForm()} />
        </form>
      </div>
    );
  }

  return (
    <div className="Register">
      <div className="RegisterHeader">
        <Link to="/" className="Icon">
          <ArrowBackIcon fontSize="large" />
        </Link>

        <Link to="/" className="Logo">
          Cupido Online
        </Link>
      </div>
      <div className="RegisterBody">
        {newUser === null ? registerForm() : confirmationForm()}
      </div>
    </div>
  );
}
