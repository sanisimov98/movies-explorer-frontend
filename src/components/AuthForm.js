import { Link, Route, Switch } from "react-router-dom";
import { ROUTES_MAP } from "../utils/routesMap";
import React from "react";
import Logo from "../images/logo.svg";

export default function AuthForm(props) {
  return (
    <>
      <form
        className="auth"
        action={"#"}
        method={"POST"}
        name={`auth_type_${props.name}`}
        onSubmit={props.onSubmit}
        noValidate
      >
        <div className="auth__container">
          <img className={"auth__logo"} alt={"Лого"} src={Logo} />
          <Switch>
            <Route path={ROUTES_MAP.SIGN_UP}>
              <h2 className="auth__title">Добро пожаловать!</h2>
            </Route>
            <Route path={ROUTES_MAP.SIGN_IN}>
              <h2 className="auth__title">Рады видеть!</h2>
            </Route>
          </Switch>
          <fieldset className="auth__form">
            {props.children}
            {props.error ? (
              <p className={"auth__error"}>{props.error}</p>
            ) : (
              <></>
            )}
            <Switch>
              <Route path={ROUTES_MAP.SIGN_UP}>
                <button
                  type="submit"
                  className="auth__form-button"
                  disabled={props.valid}
                >
                  Зарегистрироваться
                </button>
              </Route>
              <Route path={ROUTES_MAP.SIGN_IN}>
                <button
                  type="submit"
                  className="auth__form-button"
                  disabled={props.valid}
                >
                  Войти
                </button>
              </Route>
            </Switch>
          </fieldset>
          <Switch>
            <Route path={ROUTES_MAP.SIGN_UP}>
              <p className="auth__form-text">
                Уже зарегистрированы?{" "}
                <Link to={ROUTES_MAP.SIGN_IN} className="auth__form-link">
                  Войти
                </Link>
              </p>
            </Route>
            <Route path={ROUTES_MAP.SIGN_IN}>
              <p className="auth__form-text">
                Ещё не зарегистрированы?{" "}
                <Link to={ROUTES_MAP.SIGN_UP} className="auth__form-link">
                  Регистрация
                </Link>
              </p>
            </Route>
          </Switch>
        </div>
      </form>
    </>
  );
}
