import React from "react";
import SearchForm from "./SearchForm";
import FilterCheckbox from "./FilterCheckbox";
import MoviesCardList from "./MoviesCardList";

export default function Movies({ films, handleFilmSave, handleFilmRemove }) {
    return (
        <section className={"movies"}>
            <SearchForm />
            <MoviesCardList films={films} savedPage={false} handleFilmSave={handleFilmSave} handleFilmRemove={handleFilmRemove} />
            <button className={"movies__button"}>Ещё</button>
        </section>
    )
}