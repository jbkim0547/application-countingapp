import React, { useState } from "react";
import "./LoginSignup.css";
import user_Icon from "../Assets/person.png";
import email_Icon from "../Assets/email.png";
import password_Icon from "../Assets/password.png";
import axios from "axios";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onSingUpClick = async () => {
    setAction("SignUp");

    const userInfo = {
      Email: userEmail,
      Password: userPassword,
      Name: userName,
    };

    const response = await axios
      .post("http://localhost:5065/api/auth/register", userInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setUserName("");
        setUserEmail("");
        setUserPassword("");
      });
  };

  const onLoginClick = async () => {
    setAction("Login");
    const loginInfo = {
      Email: userEmail,
      Password: userPassword,
    };

    const response = await axios
      .post("http://localhost:5065/api/auth/login", loginInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        console.log("login Successful")
        setUserEmail("");
        setUserPassword("");
      });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <>
            <div className="input">
              <img src={user_Icon} alt="" />
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="input">
              <img src={email_Icon} alt="" />
              <input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="input">
              <img src={password_Icon} alt="" />
              <input
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="loginPage">
              Ready to Login?{" "}
              <span
                onClick={() => {
                  setAction("Login");
                }}
              >
                Click Here!
              </span>
            </div>
          </>
        )}
      </div>
      {action === "SignUp" ? (
        <div></div>
      ) : (
        <>
          <div className="inputs">
            <div className="input">
              <img src={email_Icon} alt="" />
              <input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="input">
              <img src={password_Icon} alt="" />
              <input
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="forgot-password">
              Lost Password? <span>Click Here!</span>
            </div>
            <div className="registerButton">
              Do not have an account?{" "}
              <span
                onClick={() => {
                  setAction("SignUp");
                }}
              >
                Click here to register!
              </span>
            </div>
          </div>
        </>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit buttonDisplayNone" : "submit"}
          onClick={onSingUpClick}
        >
          Sign Up
        </div>
        <div
          className={
            action === "SignUp" ? "submit buttonDisplayNone" : "submit"
          }
          onClick={onLoginClick}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
