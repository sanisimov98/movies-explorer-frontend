import React from "react";

export default function NavTab() {
  return (
    <nav className={"nav"}>
      <ul className={"nav__list"}>
        <li className={"nav__item"}>
          <a href={"#about"} className={"nav__link"}>
            О проекте
          </a>
        </li>
        <li className={"nav__item"}>
          <a href={"#techs"} className={"nav__link"}>
            Технологии
          </a>
        </li>
        <li className={"nav__item"}>
          <a href={"#about-me"} className={"nav__link"}>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}
