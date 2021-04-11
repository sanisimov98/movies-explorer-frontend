import React from "react";
import { useHistory } from "react-router-dom";

export default function NotFound() {
  const history = useHistory();
  const goBackHandle = () => {
    history.goBack();
  };
  return (
    <section className={"not-found"}>
      <div className={"not-found__container"}>
        <h2 className={"not-found__title"}>404</h2>
        <p className={"not-found__text"}>Страница не найдена</p>
      </div>
      <p className={"not-found__link"} onClick={goBackHandle}>
        Назад
      </p>
    </section>
  );
}
