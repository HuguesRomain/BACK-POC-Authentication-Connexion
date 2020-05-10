import React, { useState, useEffect } from "react";
import "../App.css";

export const SingUp = ({ setDisplay }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: null,
    lastName: null,
    mail: null,
    password: null,
    sex: null,
    hobbies: null,
    phoneNumber: null,
    job: null,
  });

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <>
      <form>
        <div className="input">
          <label>first name</label>
          <input
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                firstName: e.currentTarget.value,
              });
            }}
            type="text"
          />
        </div>
        <div className="input">
          <label>last name</label>
          <input
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                lastName: e.currentTarget.value,
              });
            }}
            type="text"
          />
        </div>
        <div className="input">
          <label>mail</label>
          <input
            onChange={(e) => {
              setUserInfo({ ...userInfo, mail: e.currentTarget.value });
            }}
            type="text"
          />
        </div>
        <div className="input">
          <label>password</label>
          <input
            onChange={(e) => {
              setUserInfo({ ...userInfo, password: e.currentTarget.value });
            }}
            type="text"
          />
        </div>
        <div className="input">
          <label>sex</label>
          <input
            onChange={(e) => {
              setUserInfo({ ...userInfo, sex: e.currentTarget.value });
            }}
            type="text"
          />
        </div>
        <div className="input">
          <label>hobbies</label>
          <input
            onChange={(e) => {
              setUserInfo({ ...userInfo, hobbies: e.currentTarget.value });
            }}
            type="text"
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(userInfo);
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
