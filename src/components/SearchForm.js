import React from "react";
import FilterCheckbox from "./FilterCheckbox";

export default function SearchForm({
  onInputChange,
  onSearch,
  searchWord,
  handleCheckboxSelected,
  shortFilmsSelected,
}) {
  return (
    <section className={"movies-searches"}>
      <form className={"search"}>
        <input
          className={"search__form"}
          placeholder={"Фильм"}
          value={searchWord}
          onChange={onInputChange}
          required
        />
        <button
          className={"search__button"}
          onClick={onSearch}
          disabled={searchWord === ""}
        >
          Найти
        </button>
      </form>
      <FilterCheckbox
        handleCheckboxSelected={handleCheckboxSelected}
        shortFilmsSelected={shortFilmsSelected}
      />
    </section>
  );
}
