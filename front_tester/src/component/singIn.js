import React, { useState } from "react";
import "../App.css";

export const SingIn = ({ setDisplay }) => {
  const [loginIngo, setLoginInfo] = useState({ mail: null, password: null });
  return (
    <>
      <form>
        <div className="input">
          <label>Mail</label>
          <input
            onChange={(e) => {
              setLoginInfo({ ...loginIngo, mail: e.currentTarget.value });
            }}
            type="text"
          />
        </div>
        <div className="input">
          <label>Password</label>
          <input
            onChange={(e) => {
              setLoginInfo({ ...loginIngo, password: e.currentTarget.value });
            }}
            type="text"
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Submit
        </button>
      </form>
      <button
        onClick={() => {
          setDisplay(null);
        }}
      >
        Back
      </button>
    </>
  );
};
