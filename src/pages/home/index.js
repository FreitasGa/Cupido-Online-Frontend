import { TextField } from "@material-ui/core";
import React from "react";
import Header from "../../components/header";
import "./styles.css";

export default function Home() {
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
        <div className="HomeMailerWrapper">
          <h2>Nova Mensagem</h2>
          <form className="HomeMailerCard">
            <TextField id="standard-basic" placeholder="Nome" />
            <TextField id="standard-basic" placeholder="Email" type="email" />
            <p>Mensagem</p>
            <TextField
              id="outlined-multiline-flexible"
              multiline
              rowsMax={4}
              variant="outlined"
            />
            <input className="MailerCardSubmit" type="submit" value="Enviar" />
          </form>
        </div>
      </div>
    </div>
  );
}
