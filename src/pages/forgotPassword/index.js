import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import { onError } from "../../libs/errorLib";

import { TextField } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import LoaderButton from "../../components/loaderButton";

import "./styles.css";

export default function ForgotPassword() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");

  const [newPassword, setNewPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0;
  }

  function validateConfirmationForm() {
    return (
      email.length > 0 &&
      code.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    try {
      const newPassword = await Auth.forgotPassword(email);
      setNewPassword(newPassword);
      handleReset();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      onError(err);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      handleReset();
      setIsLoading(false);
      alert("Senha alterada");
      history.push("/login");
    } catch (err) {
      setIsLoading(false);
      onError(err);
    }
  }

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  function forgetPasswordForm() {
    return (
      <div className="ForgotPasswordWrapper">
        <h2>Esqueci a senha</h2>
        <form className="ForgotPasswordCard" onSubmit={handleSubmit} >
          <p>Digite o e-mail para enviar o código de recuperação</p>
          <TextField id="standard-basic" placeholder="E-mail" type="email" autoFocus onChange={(e) => setEmail(e.target.value)} />
          <LoaderButton type="submit" isLoading={isLoading} disabled={!validateForm()} className="ForgotPasswordCardSubmit">
            Enviar
          </LoaderButton>
        </form>
      </div>
    );
  }

  function confirmationForm() {
    return (
      <div className="ForgotPasswordWrapper">
        <h2>Nova senha</h2>
        <form className="ForgotPasswordCard" onSubmit={handleConfirmationSubmit} >
          <p>Verifique o o código que foi enviado ao seu e-mail</p>
          <TextField id="standard-basic" placeholder="Senha" type="password" autoFocus onChange={(e) => setPassword(e.target.value)} />
          <TextField id="standard-basic" placeholder="Confirme a senha" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
          <TextField id="standard-basic" placeholder="Código" onChange={(e) => setCode(e.target.value)} />
          <LoaderButton type="submit" isLoading={isLoading} disabled={!validateConfirmationForm()} className="ForgotPasswordCardSubmit">
            Mudar senha
          </LoaderButton>
        </form>
      </div>
    );
  }

  return (
    <div className="ForgotPassword">
      <div className="ForgotPasswordHeader">
        <Link to="/login" className="Icon">
          <ArrowBackIcon fontSize="large" />
        </Link>

        <Link to="/" className="Logo">
          Cupido Online
        </Link>
      </div>
      <div className="ForgotPasswordBody">
        {newPassword === null ? forgetPasswordForm() : confirmationForm()}
      </div>
    </div>
  );
}
