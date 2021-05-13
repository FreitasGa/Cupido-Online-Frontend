import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "aws-amplify"

import { onError } from "../../libs/errorLib";

import "./styles.css";

export default function Match() {
  const { id, user_id } = useParams();
  console.log(id , user_id);

  useEffect(() => {
    async function onLoad() {
      try {
        await API.put("cupido-online", `/message/${id}/match/${user_id}`);
      } catch (err) {
        console.log(err);
        onError(err);
      }
    }

    onLoad();
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
