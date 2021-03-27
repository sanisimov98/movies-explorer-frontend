import React from "react";

export default function Profile() {
    return (
        <section className={"profile"}>
            <h2 className={"profile__title"}>
                Привет, Виталий!
            </h2>
            <div className={"profile__data"}>
                <div className={"profile__data-item"}>
                    <p className={"profile__item-subtitle"}>
                        Имя
                    </p>
                    <p className={"profile__item-text"}>
                        Виталий
                    </p>
                </div>
                <div className={"profile__data-item profile__data-item_last"}>
                    <p className={"profile__item-subtitle"}>
                        Почта
                    </p>
                    <p className={"profile__item-text"}>
                        pochta@yandex.ru
                    </p>
                </div>
                <div className={"profile__settings"}>
                    <p className={"profile__settings-text"}>
                        Редактировать
                    </p>
                    <p className={"profile__settings-logout"}>
                        Выйти из аккаунта
                    </p>
                </div>
            </div>
        </section>
    )
}