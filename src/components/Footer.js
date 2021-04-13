import React from "react";
import { Route, Switch } from "react-router-dom";
import { ROUTES_MAP } from "../utils/routesMap";

export default function Footer() {
  return (
    <Switch>
      <Route exact path={ROUTES_MAP.NOT_FOUND} />
      <Route exact path={ROUTES_MAP.SIGN_UP} />
      <Route exact path={ROUTES_MAP.SIGN_IN} />
      <Route path={"*"}>
        <footer className={"footer"}>
          <p className={"footer__about"}>
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <div className={"footer__container"}>
            <p className={"footer__year"}>© 2020</p>
            <ul className={"footer__links"}>
              <li className={"footer__link"}>
                <a
                  className={"footer__link-text"}
                  href={"https://praktikum.yandex.ru/"}
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li className={"footer__link"}>
                <a
                  className={"footer__link-text"}
                  href={"https://github.com/sanisimov98"}
                >
                  Github
                </a>
              </li>
              <li className={"footer__link"}>
                <a
                  className={"footer__link-text"}
                  href={"https://www.facebook.com/sanisimov98"}
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </Route>
      <Route />
    </Switch>
  );
}
