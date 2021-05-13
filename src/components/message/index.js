import React from "react";
import { API } from "aws-amplify";

import { onError } from "../../libs/errorLib";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";

import "./styles.css";

export default function Message(props) {
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await API.del("cupido-online", `/message/${props.id}`)

      props.callback()
    } catch (err) {
      console.log(err);
      onError(err);
    }
  }

  return (
    <div className="Message">
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      <div className="MessageContent">
        <p>{props.content}</p>
      </div>
      {props.match ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon className="Icon" fontSize="large" />}
      <button onClick={handleSubmit}>
        <DeleteIcon fontSize="large" />
      </button>
    </div>
  );
}
