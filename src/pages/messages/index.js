import React, { useEffect, useRef, useState } from "react";
import { API } from "aws-amplify";

import { onError } from "../../libs/errorLib";
import { useAppContext } from "../../libs/contextLib";

import Header from "../../components/header";
import Message from "../../components/message";

import "./styles.css";

export default function Messages() {
  const { isAuthenticated } = useAppContext();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const messages = await loadMessage();
        setMessages(messages);
        console.log(messages);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [isAuthenticated]);

  function loadMessage() {
    return API.get("cupido-online", "/message");
  }

  return (
    <div className="Messages">
      <Header />
      <div className="MessageBody">
        <div className="MessageWrapper">
          {messages.map(({id, crush_name, crush_email, content, is_match}) => (
            <Message key={id} id={id} name={crush_name} email={crush_email} content={content} match={is_match} />
          ))}
        </div>
      </div>
    </div>
  );
}