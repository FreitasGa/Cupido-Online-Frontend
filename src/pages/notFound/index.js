import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function NotFound() {
  return (
    <div className="NotFound">
      <div className="NotFoundHeader">
        <Link to="/" className="Logo">
          Cupido Online
        </Link>
      </div>
      <div className="NotFoundBody">
        <h2>Desculpe, não encontramos esta pagina!</h2>
        <Link to="/">Voltar para o Inicio</Link>
      </div>
    </div>
  );
}
