import React from "react";
import { ROUTES_MAP } from "../utils/routesMap";
import AuthForm from "./AuthForm";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login({ onLogin, isLoggedIn, error }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      history.push(ROUTES_MAP.FILMS);
    }
  }, [history, isLoggedIn]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(email, password);
  };

  const handleEmailValidation = (evt) => {
    if (!evt.target.validity.valid) {
      setEmailValid(false);
      setEmail(evt.target.value);
    } else {
      setEmailValid(true);
      setEmail(evt.target.value);
    }
  };

  const handlePasswordValidation = (evt) => {
    if (!evt.target.validity.valid) {
      setPasswordValid(false);
      setPassword(evt.target.value);
    } else {
      setPasswordValid(true);
      setPassword(evt.target.value);
    }
  };

  return (
    <AuthForm
      name={"login"}
      onSubmit={handleSubmit}
      valid={!(emailValid && passwordValid)}
      error={error}
    >
      <p className={"auth__label"}>E-mail</p>
      <input
        id="email"
        className="auth__form-item"
        type="email"
        name="email"
        placeholder=""
        required
        onChange={handleEmailValidation}
        value={email}
      />
      {emailValid ? (
        <p className={"auth__error"}> </p>
      ) : (
        <p className={"auth__error"}>
          Введите правильный адрес электронной почты
        </p>
      )}
      <p className={"auth__label"}>Пароль</p>
      <input
        id="password"
        className="auth__form-item"
        type="password"
        name="password"
        placeholder=""
        required
        value={password}
        minLength={2}
        onChange={handlePasswordValidation}
      />
      {passwordValid ? (
        <p className={"auth__error"}> </p>
      ) : (
        <p className={"auth__error"}>
          Поле пароль обязательно, минимальная длина пароля – 2 символа
        </p>
      )}
    </AuthForm>
  );
}
