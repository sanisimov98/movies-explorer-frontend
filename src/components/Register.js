import AuthForm from "./AuthForm";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ROUTES_MAP } from "../utils/routesMap";

export default function Register({ onRegister, isLoggedIn }) {
  const history = useHistory();
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push(ROUTES_MAP.SIGN_IN);
    }
  }, [isLoggedIn]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister();
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

  const handleNameValidation = (evt) => {
    if (!evt.target.validity.valid) {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  return (
    <AuthForm name={"register"} onSubmit={handleSubmit}>
      <p className={"auth__label"}>Имя</p>
      <input
        id="name"
        className="auth__form-item"
        type="text"
        name="name"
        placeholder=""
        required
        onChange={handleNameValidation}
      />
      {nameValid ? (
        <></>
      ) : (
        <p className={"auth__error"}>Что-то пошло не так...</p>
      )}
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
