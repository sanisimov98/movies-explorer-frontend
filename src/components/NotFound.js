import React from "react";
import { Link } from "react-router-dom";
import { ROUTES_MAP } from "../utils/routesMap";

export default function NotFound() {
  return (
    <section className={"not-found"}>
      <div className={"not-found__container"}>
        <h2 className={"not-found__title"}>404</h2>
        <p className={"not-found__text"}>Страница не найдена</p>
      </div>
      <Link to={ROUTES_MAP.MAIN}>
        <p className={"not-found__link"}>Назад</p>
      </Link>
    </section>
  );
}
