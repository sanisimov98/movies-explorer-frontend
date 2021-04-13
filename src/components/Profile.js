import React, { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Profile({ onUpdate, onLogout, successText }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [emailValid, setEmailValid] = useState(true);
  const [email, setEmail] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    setEmail(currentUser.email);
    setName(currentUser.name);
  }, [currentUser]);

  const handleProfileUpdate = () => {
    onUpdate({ email, name });
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
    <section className={"profile"}>
      <h2 className={"profile__title"}>Привет, {currentUser.name}!</h2>
      <div className={"profile__data"}>
        <div className={"profile__data-item"}>
          <p className={"profile__item-subtitle"}>Имя</p>
          <input
            className={"profile__item-text"}
            value={name}
            onChange={handleNameValidation}
            pattern={"[A-zА-я -]*"}
            type="text"
            name="name"
            id="name"
            required
          />
        </div>
        {nameValid ? (
          <p className={"auth__error"}> </p>
        ) : (
          <p className={"auth__error"}>
            Поле должно содержать только латиницу, кириллицу, пробел или дефис
          </p>
        )}
        <div className={"profile__data-item profile__data-item_last"}>
          <p className={"profile__item-subtitle"}>Почта</p>
          <input
            className={"profile__item-text"}
            value={email}
            onChange={handleEmailValidation}
            type="email"
            name={"email"}
            id={"email"}
            required
          />
        </div>
        {emailValid ? (
          <p className={"auth__error"}> </p>
        ) : (
          <p className={"auth__error"}>
            Введите правильный адрес электронной почты
          </p>
        )}
        <div className={"profile__settings"}>
          <p
            className={"profile__settings-text profile__settings-text_success"}
          >
            {successText !== "" ? successText : ""}
          </p>
          <button
            className={"profile__settings-text"}
            onClick={handleProfileUpdate}
            disabled={
              !(
                emailValid &&
                nameValid &&
                !(currentUser.name === name && currentUser.email === email)
              )
            }
          >
            Редактировать
          </button>
          <button className={"profile__settings-logout"} onClick={onLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </section>
  );
}
