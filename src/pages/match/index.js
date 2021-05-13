import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "aws-amplify"

import { onError } from "../../libs/errorLib";

import "./styles.css";

export default function Match() {
  const [params, setParams] = useState({
    id: "",
    match: ""
  });
  
  const pathParams = useParams();

  setParams({
    id: pathParams.id,
    match: pathParams.match,
  });

  useEffect(() => {
    async function onLoad() {
      try {
        await API.put("cupido-online", `/message/${params.id}/match/${params.match}`);
      } catch (err) {
        console.log(err);
        onError(err);
      }
    }

    onLoad();
  }, [params]);

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
