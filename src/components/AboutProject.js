export default function AboutProject() {
    return (
        <section className={"about"} id={"about"}>
            <h2 className={"main__subtitle"}>
                О проекте
            </h2>
            <div className={"about__info"}>
                <div className={"about__info-item about__info-item_area_1"}>
                    <h3 className={"about__info-title"}>Дипломный проект включал 5 этапов</h3>
                    <p className={"about__info-text"}>
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className={"about__info-item about__info-item_area_2"}>
                    <h3 className={"about__info-title"}>На выполнение диплома ушло 5 недель</h3>
                    <p className={"about__info-text"}>
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
                <div className={"about__info-bar"}>
                    <p className={"about__info-bar-item about__info-bar-item_type_backend"}>
                        1 неделя
                    </p>
                    <p className={"about__info-bar-item about__info-bar-item_type_frontend"}>
                        4 недели
                    </p>
                    <p className={"about__info-bar-item about__info-bar-item_type_subtitle-backend"}>
                        Back-end
                    </p>
                    <p className={"about__info-bar-item about__info-bar-item_type_subtitle-frontend"}>
                        Front-end
                    </p>
                </div>
            </div>
        </section>
    )
}