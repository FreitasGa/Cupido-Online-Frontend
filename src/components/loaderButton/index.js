import React from "react";

import LoopIcon from "@material-ui/icons/Loop";

import "./styles.css";

export default function LoaderButton(props) {
  return (
    <button
      disabled={props.disabled || props.isLoading}
      className={`LoaderButton ${props.className}`}
      {...props}
    >
      {props.isLoading && <LoopIcon className="LoaderSpinning" />}
      {props.children}
    </button>
  );
}
