import React, { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";
import { Link } from "react-router-dom";

import { onError } from "../../libs/errorLib";
import { useAppContext } from "../../libs/contextLib";

import Header from "../../components/header";
import { TextField } from "@material-ui/core";
import LoaderButton from "../../components/loaderButton";

import "./styles.css";


export default function Home() {
  const { isAuthenticated } = useAppContext();

  const [crushName, setCrushName] = useState("");
  const [crushEmail, setCrushEmail] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [userAttributes, setUserAttributes] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const user = await Auth.currentAuthenticatedUser();
        const { attributes } = user;
        setUserAttributes({
          email: attributes.email,
          name: attributes.name
        });
      } catch (err) {
        console.log(err);
        onError(err);
      }
    }

    onLoad()
  }, [isAuthenticated]);

  function validateForm() {
    return crushName.length > 0 && crushEmail.length > 0 && content.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    const message = {
      crush_name: crushName,
      crush_email: crushEmail,
      content,
    };

    setIsLoading(true);
    
    try {
      if (!isAuthenticated) {
        await sendMessage(message);
      } else {
        const newMessage = await createMessage(message);
        const { id, user_id } = newMessage;

        await API.post("cupido-online", "/auth/email", {
          body: {
            crush_name: crushName,
            crush_email: crushEmail,
            content,
            id,
            user_id
          },
        });
      }
      handleReset()
      setIsLoading(false);
      alert("Mensagem enviada");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      onError(err);
    }
  }

  function sendMessage(message) {
    return API.post("cupido-online", "/email", {
      body: message,
    });
  }

  function createMessage(message) {
    return API.post("cupido-online", "/message", {
      body: message,
    });
  }

  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = "")
    );
    Array.from(document.querySelectorAll('textarea')).forEach(
      input => (input.value = "")
    );
  }

  return (
    <div className="Home">
      <Header />
      <div className="HomeBody">
        <div className="HomeAbout">
          <h2>Bem-Vindo</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet
            elementum augue. Pellentesque in ultrices mi. Proin pharetra
            vulputate justo, ac tristique est tempor a. Sed feugiat ipsum
            hendrerit elit rhoncus, eu eleifend eros accumsan. Nulla quis
            gravida lacus. Phasellus feugiat metus ut maximus faucibus. Integer
            non rutrum odio. Duis at ipsum sodales ipsum aliquet dignissim
            hendrerit eget eros. Interdum et malesuada fames ac ante ipsum
            primis in faucibus.
          </p>
        </div>
        <div className="HomeWrapper">
          <div className="HomeMailerWrapper">
            <h2>Nova Mensagem</h2>
            <form className="HomeMailerCard" onSubmit={handleSubmit}>
              <TextField id="standard-basic" placeholder="Nome" onChange={(e) => setCrushName(e.target.value)} />
              <TextField id="standard-basic" placeholder="E-mail" type="email" onChange={(e) => setCrushEmail(e.target.value)}/>
              <p>Mensagem</p>
              <TextField id="outlined-multiline-flexible" multiline rowsMax={4} variant="outlined" onChange={(e) => setContent(e.target.value)}/>
              <LoaderButton type="submit" disabled={!validateForm()} isLoading={isLoading} className="MailerCardSubmit" >
                Enviar
              </LoaderButton>
            </form>
          </div>
          <div className="HomeProfile" style={{ display: isAuthenticated ? "flex" : "none" }}>
            <h2>Perfil</h2>
            <div className="HomeProfileCard">
              <h3>{userAttributes.name}</h3>
              <p>{userAttributes.email}</p>
              <Link to="/edit-password">Mudar senha</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
