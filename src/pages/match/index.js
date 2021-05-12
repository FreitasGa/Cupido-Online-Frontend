import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API, Auth } from "aws-amplify"

import { onError } from "../../libs/errorLib";

import { TextField } from "@material-ui/core";
import LoaderButton from "../../components/loaderButton";

import "./styles.css";

export default function Match() {
  const { id, match } = useParams();

  useEffect(() => {
    async function onLoad() {
      try {
        await API.put("cupido-online", `/message/${id}/match/${match}`);
      } catch (err) {
        console.log(err);
        onError(err);
      }
    }
  });

  return (
    <div className="Match">
      <div className="MatchHeader">
        <Link to="/" className="Logo">
          Cupido Online
        </Link>
      </div>
      <div className="MatchBody">
        <div className="MatchAbout">
          <h2>E agora?</h2>
          <p>Bom, nos já marcamos a mensagem como match então é so esperar a resposta no seu e-mail.</p>
          <p>Ah, e se quiser dar uma passadinha na nossa plataforma é so clicar no botão aqui em baixo!</p>
          <Link to="/">Acessar</Link>
        </div>
      </div>
    </div>
  );
}
