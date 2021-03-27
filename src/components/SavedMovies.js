import MoviesCardList from "./MoviesCardList";
import SearchForm from "./SearchForm";

export default function SavedMovies({ films, handleFilmRemove, handleFilmSave }) {
    return (
        <section className={"movies"}>
            <SearchForm />
            <MoviesCardList films={films} savedPage={true} handleFilmSave={handleFilmSave} handleFilmRemove={handleFilmRemove} />
        </section>
    )
}