import MoviesCard from "./MoviesCard";
import { useEffect, useState } from "react";

export default function MoviesCardList({
  films,
  savedPage,
  handleFilmSave,
  handleFilmRemove,
}) {
  const [filmsCount, setFilmsCount] = useState(12);
  const [filmsRowCount, setFilmsRowCount] = useState(3);
  const [displayedFilms, setDisplayedFilms] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function updateWidth() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (windowWidth > 1024) {
      setFilmsCount(12);
      setFilmsRowCount(3);
    } else if (windowWidth > 700) {
      setFilmsCount(8);
      setFilmsRowCount(2);
    } else if (windowWidth > 320) {
      setFilmsCount(5);
      setFilmsRowCount(1);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (films.length > 0) {
      setDisplayedFilms(films.slice(0, filmsCount));
    }
  }, [films, filmsCount]);

  const moreFilmsButtonHandler = () => {
    const currentLength = displayedFilms.length;
    setDisplayedFilms(films.slice(0, currentLength + filmsRowCount));
  };

  return (
    <>
      <section className={"card-list"}>
        {displayedFilms.map((film) => {
          return (
            <MoviesCard
              film={film}
              key={savedPage ? film._id : film.id}
              savedPage={savedPage}
              handleFilmSave={handleFilmSave}
              handleFilmRemove={handleFilmRemove}
            />
          );
        })}
      </section>
      {displayedFilms.length + filmsRowCount < films.length + filmsRowCount ? (
        <button className={"movies__button"} onClick={moreFilmsButtonHandler}>
          Ещё
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
