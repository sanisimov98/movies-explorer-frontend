import AuthForm from "./AuthForm";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ROUTES_MAP } from "../utils/routesMap";
import validator from "validator";

export default function Register({ onRegister }) {
  const history = useHistory();
  const [emailValid, setEmailValid] = useState(true);
  const [email, setEmail] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [password, setPassword] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (evt) => {
    setError("");
    evt.preventDefault();
    onRegister(email, password, name)
      .then((res) => {
        if (res && res.message) {
          setError(res.message);
        }
        if (res && res.email && res.name) {
          setError("");
          history.push(ROUTES_MAP.FILMS);
          return;
        }
      })
      .catch((err) => console.log(err));
    setEmail("");
    setPassword("");
    setName("");
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

  const handleNameValidation = (evt) => {
    if (!evt.target.validity.valid) {
      setNameValid(false);
      setName(evt.target.value);
    } else {
      setNameValid(true);
      setName(evt.target.value);
    }
  };

  return (
    <AuthForm
      name={"register"}
      onSubmit={handleSubmit}
      valid={
        !(
          emailValid &&
          passwordValid &&
          nameValid &&
          name !== "" &&
          email !== "" &&
          password !== ""
        )
      }
      error={error}
    >
      <p className={"auth__label"}>Имя</p>
      <input
        id="name"
        className="auth__form-item"
        type="text"
        name="name"
        placeholder=""
        required
        pattern={"[A-zА-я -]*"}
        onChange={handleNameValidation}
        value={name}
        minLength={2}
        maxLength={30}
      />
      {nameValid ? (
        <p className={"auth__error"}> </p>
      ) : (
        <p className={"auth__error"}>
          Имя должно содержать только латиницу, кириллицу, пробел или дефис и
          быть длиной от 2 до 30 символов
        </p>
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
        onChange={handlePasswordValidation}
        value={password}
      />
      {passwordValid ? (
        <p className={"auth__error"}> </p>
      ) : (
        <p className={"auth__error"}>Поле пароль обязательно</p>
      )}
    </AuthForm>
  );
}
