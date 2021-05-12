import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";

import { onError } from "../../libs/errorLib";
import { useAppContext } from "../../libs/contextLib";

import Header from "../../components/header";
import Message from "../../components/message";

import "./styles.css";

export default function Messages() {
  const sessionMessage = JSON.parse(sessionStorage.getItem("cupido-online/messages"));
  const { isAuthenticated } = useAppContext();

  const [messages, setMessages] = useState(sessionMessage || []);
  const [state, setState] = useState(false);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const messages = await API.get("cupido-online", "/message");
        setMessages(messages);
        sessionStorage.setItem("cupido-online/messages",JSON.stringify(messages));
        console.log(messages);
      } catch (err) {
        console.log(err);
        onError(err);
      }
    }

    onLoad();
  }, [isAuthenticated, state]);

  function update() {
    setState(!state);
  }

  return (
    <div className="Messages">
      <Header />
      <div className="MessageBody">
        <div className="MessageWrapper">
          {messages.length === 0 ? (
            <h2 className="MessagePlaceholder">Parece que você ainda não tem nenhuma mensagem.</h2>
          ) : 
            messages.map(({id, crush_name, crush_email, content, is_match}) => (
              <Message key={id} id={id} name={crush_name} email={crush_email} content={content} match={is_match} callback={update} />
            ))
          }
        </div>
      </div>
    </div>
  );
}