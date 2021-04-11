import React from "react";
import { ROUTES_MAP } from "../utils/routesMap";
import AuthForm from "./AuthForm";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import validator from "validator";

export default function Login({ onLogin, isLoggedIn }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      history.push(ROUTES_MAP.FILMS);
    }
  }, [history, isLoggedIn]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(email, password)
      .then((data) => {
        if (data && data.message) {
          setError(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEmailValidation = (evt) => {
    if (!validator.isEmail(evt.target.value)) {
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
        onChange={handlePasswordValidation}
      />
      {passwordValid ? (
        <p className={"auth__error"}> </p>
      ) : (
        <p className={"auth__error"}>Поле пароль обязательно</p>
      )}
    </AuthForm>
  );
}
