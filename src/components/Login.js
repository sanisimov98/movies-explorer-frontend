import React from "react";
import { ROUTES_MAP } from "../utils/routesMap";
import AuthForm from "./AuthForm";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function Login({ isLoggedIn, onLogin }) {
  const history = useHistory();
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push(ROUTES_MAP.FILMS);
    }
  }, [isLoggedIn]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin();
  };

  const handleEmailValidation = (evt) => {
    if (!evt.target.validity.valid) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const handlePasswordValidation = (evt) => {
    if (!evt.target.validity.valid) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  return (
    <AuthForm name={"login"} onSubmit={handleSubmit}>
      <p className={"auth__label"}>E-mail</p>
      <input
        id="email"
        className="auth__form-item"
        type="email"
        name="email"
        placeholder=""
        required
        onChange={handleEmailValidation}
      />
      {emailValid ? (
        <></>
      ) : (
        <p className={"auth__error"}>Что-то пошло не так...</p>
      )}
      <p className={"auth__label"}>Пароль</p>
      <input
        id="password"
        className="auth__form-item"
        type="password"
        name="password"
        placeholder=""
        required
        onChange={handlePasswordValidation}
      />
      {passwordValid ? (
        <></>
      ) : (
        <p className={"auth__error"}>Что-то пошло не так...</p>
      )}
    </AuthForm>
  );
}
