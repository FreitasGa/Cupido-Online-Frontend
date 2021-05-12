import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

import { onError } from "../../libs/errorLib";
import { useAppContext } from "../../libs/contextLib";

import { TextField } from "@material-ui/core";

import Header from "../../components/header";
import LoaderButton from "../../components/loaderButton";

import "./styles.css";

export default function Profile() {
  const { isAuthenticated } = useAppContext();

  const [user, setUser] = useState();
  const [userAttributes, setUserAttributes] = useState({
    email: "",
    name: "",
  });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const user = await Auth.currentAuthenticatedUser();
        const { attributes } = user;
        setUser(user);
        setUserAttributes(attributes);
        console.log(attributes);
      } catch (err) {
        console.log(err);
        onError(err);
      }
    }

    onLoad();
  }, [isAuthenticated]);

  function validateForm() {
    return (
      password.length > 0 &&
      newPassword.length > 0 &&
      newPassword === confirmPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    try {
      await Auth.changePassword(user, password, newPassword);
      setIsLoading(false);
      alert("Senha Alterada");
    } catch (err) {
      console.log(err);
      onError(err);
      setIsLoading(false);
    }
  }

  return (
    <div className="Profile">
      <Header />
      <div className="ProfileBody">
        <div className="ProfileWrapper">
          <h2>Perfil</h2>
          <div className="ProfileCard">
            <h3>{userAttributes.name}</h3>
            <p>{userAttributes.email}</p>
          </div>
        </div>
        
        <div className="EditPasswordWrapper">
          <h2>Mudar senha</h2>
          <form className="EditPasswordCard" onSubmit={handleSubmit}>
            <TextField id="standard-basic" placeholder="Senha atual" type="password" onChange={(e) => setPassword(e.target.value)} />
            <TextField id="standard-basic" placeholder="Nova senha" type="password" onChange={(e) => setNewPassword(e.target.value)} />
            <TextField id="standard-basic" placeholder="Confirme a nova senha" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
            <LoaderButton type="submit" isLoading={isLoading} disabled={!validateForm()} className="EditPasswordCardSubmit">
              Mudar senha
            </LoaderButton>
          </form>
        </div>
      </div>
    </div>
  );
}
