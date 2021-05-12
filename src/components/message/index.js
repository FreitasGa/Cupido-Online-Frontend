import React, { useState } from "react";
import { API } from "aws-amplify";

import { onError } from "../../libs/errorLib";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";

import "./styles.css";

export default function Message(props) {
  const [match, setMatch] = useState(props.match);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      //deleteMessage(props.id);
      alert("Mensagem apagada");
    } catch (err) {
      console.log(err);
      onError(err);
    }
  }

  function deleteMessage(id) {
    return API.del("cupido-online", `/message/${id}`);
  }

  return (
    <div className="Message">
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      <div className="MessageContent">
        <p>{props.content}</p>
      </div>
      {match ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />}
      <button onClick={handleSubmit}>
        <DeleteIcon fontSize="large" />
      </button>
    </div>
  );
}
