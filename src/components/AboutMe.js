import React from "react";
import myPhoto from "../images/me.png"

export default function AboutMe() {
    return (
        <section className={"about-me"} id={"about-me"}>
            <h2 className={"main__subtitle"}>
                Студент
            </h2>
            <div className={"about-me__container"}>
                <div className={"about-me__info"}>
                    <div className={"about-me__texts"}>
                        <h3 className={"about-me__name"}>
                            Александр
                        </h3>
                        <p className={"about-me__text about-me__text_bold"}>
                            Веб-разработчик, 23 года
                        </p>
                        <p className={"about-me__text"}>
                            Заканчиваю курс веб-разработки «Яндекс.Практикум», на котором научился верстать
                            (HTML, CSS), программировать на нативном JavaScript, работать с фреймворком React.
                            Также получил базовые представления о работе с Node.js.
                        </p>
                    </div>
                    <ul className={"about-me__links"}>
                        <li className={"about-me__link"}>
                            <a className={"about-me__link-text"} href={"https://www.facebook.com/sanisimov98"}>Facebook</a>
                        </li>
                        <li className={"about-me__link"}>
                            <a className={"about-me__link-text"} href={"https://github.com/sanisimov98"}>Github</a>
                        </li>
                    </ul>
                </div>
                <img className={"about-me__photo"} alt={"Я!"} src={myPhoto}/>
            </div>
        </section>
    )
}