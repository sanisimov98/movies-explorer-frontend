import { Link } from "react-router-dom";
import { ROUTES_MAP } from "../utils/routesMap";
import iconMain from "../images/icon-main.svg";
import React from "react";

export default function Navigation({ isLoggedIn, menuOpened, handleMenuOpen }) {
  if (isLoggedIn) {
    return (
      <div
        className={`header__films-menu ${
          menuOpened ? "" : "header__films-menu_hidden"
        }`}
      >
        <div className={`header__films-container`}>
          <div className={"header__films"}>
            <Link
              className={`header__films-item header__films-item_mobile`}
              to={ROUTES_MAP.MAIN}
              onClick={handleMenuOpen}
            >
              Главная
            </Link>
            <Link
              className={"header__films-item header__films-item_bold"}
              to={ROUTES_MAP.FILMS}
              onClick={handleMenuOpen}
            >
              Фильмы
            </Link>
            <Link
              className={"header__films-item"}
              to={ROUTES_MAP.SAVED_FILMS}
              onClick={handleMenuOpen}
            >
              Сохранённые фильмы
            </Link>
          </div>

          <Link className={"header__profile"} to={ROUTES_MAP.PROFILE}>
            <p className={"header__profile-text"}>Аккаунт</p>
            <div className={"header__profile-icon"}>
              <img
                src={iconMain}
                alt={"аккаунт"}
                className={"header__profile-icon-img"}
              />
            </div>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={"header__buttons"}>
        <Link to={ROUTES_MAP.SIGN_UP} className={"header__button"}>
          Регистрация
        </Link>
        <Link
          to={ROUTES_MAP.SIGN_IN}
          className={"header__button header__button_login"}
        >
          Войти
        </Link>
      </div>
    );
  }
}
