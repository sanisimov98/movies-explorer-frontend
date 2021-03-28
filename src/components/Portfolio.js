export default function Portfolio() {
  return (
    <section className={"portfolio"}>
      <h2 className={"portfolio__title"}>Портфолио</h2>
      <ul className={"portfolio__list"}>
        <li className={"portfolio__list-item"}>
          <a
            className={"portfolio__link"}
            href={"https://github.com/sanisimov98/how-to-learn"}
          >
            <p className={"portfolio__link-text"}>Статичный сайт</p>
            <p className={"portfolio__link-text"}>↗</p>
          </a>
        </li>
        <li className={"portfolio__list-item"}>
          <a
            className={"portfolio__link"}
            href={"https://github.com/sanisimov98/russian-travel"}
          >
            <p className={"portfolio__link-text"}>Адаптивный сайт</p>
            <p className={"portfolio__link-text"}>↗</p>
          </a>
        </li>
        <li className={"portfolio__list-item"}>
          <a
            className={"portfolio__link portfolio__link_last"}
            href={"https://github.com/sanisimov98/react-mesto-api-full"}
          >
            <p className={"portfolio__link-text"}>Одностраничное приложение</p>
            <p className={"portfolio__link-text"}>↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
