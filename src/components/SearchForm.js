import React from "react";
import FilterCheckbox from "./FilterCheckbox";

export default function SearchForm() {
  return (
    <section className={"movies-searches"}>
      <form className={"search"}>
        <input className={"search__form"} placeholder={"Фильм"} required />
        <button className={"search__button"}>Найти</button>
      </form>
      <FilterCheckbox />
    </section>
  );
}
