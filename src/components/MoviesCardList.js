import MoviesCard from "./MoviesCard";

export default function MoviesCardList({
  films,
  savedPage,
  handleFilmSave,
  handleFilmRemove,
}) {
  return (
    <section className={"card-list"}>
      {films.map((film) => {
        return (
          <MoviesCard
            film={film}
            key={film.id}
            savedPage={savedPage}
            handleFilmSave={handleFilmSave}
            handleFilmRemove={handleFilmRemove}
          />
        );
      })}
    </section>
  );
}
