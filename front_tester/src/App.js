import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SingUp } from "./component/singUp";
import { SingIn } from "./component/singIn";

export const App = () => {
  const [display, setDisplay] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {display === null ? (
          <>
            <button
              onClick={() => {
                setDisplay("login");
              }}
            >
              login
            </button>
            <button
              onClick={() => {
                setDisplay("register");
              }}
            >
              register
            </button>{" "}
          </>
        ) : display === "login" ? (
          <SingIn setDisplay={setDisplay} />
        ) : (
          <SingUp setDisplay={setDisplay} />
        )}
      </header>
    </div>
  );
};
