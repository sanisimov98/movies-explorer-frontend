import React, { useEffect, useState } from "react";
import save from "../images/save.svg";
import deleteIcon from "../images/delete-film.svg";

export default function MoviesCard({
  film,
  savedPage,
  handleFilmRemove,
  handleFilmSave,
  savedFilms,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const duration = `${Math.round(film.duration / 60)}ч ${film.duration % 60}м`;

  useEffect(() => {
    if (!savedPage) {
      const filmIsSavedCheck = (film) => {
        return !!savedFilms.find((savedFilm) => savedFilm.movieId === film.id);
      };
      if (filmIsSavedCheck(film)) {
        setIsSaved(true);
      }
    }
  }, [savedPage, savedFilms, film]);

  const saveFilm = () => {
    handleFilmSave(film);
    setIsSaved(true);
  };

  const removeFilm = () => {
    handleFilmRemove(film);
    setIsSaved(false);
  };

  const handleCardMouseOver = () => {
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={"card"}
      onMouseOver={handleCardMouseOver}
      onMouseLeave={handleCardMouseLeave}
    >
      {savedPage ? (
        <img
          className={"card__remove"}
          src={deleteIcon}
          alt={"Удалить фильм"}
          onClick={removeFilm}
        />
      ) : isSaved ? (
        <img
          className={`card__check`}
          src={save}
          alt={"Добавлено"}
          onClick={removeFilm}
        />
      ) : (
        <p
          className={`card__save ${isHovered ? "" : "card__save_hidden"}`}
          onClick={saveFilm}
        >
          Сохранить
        </p>
      )}
      <a href={film.trailerLink} target={"_blank"} rel="noreferrer">
        <img
          className={"card__image"}
          src={
            savedPage
              ? film.image
                ? film.image
                : ""
              : film.image
              ? `https://api.nomoreparties.co${film.image.url}`
              : ""
          }
          alt={film.nameRU}
        />
      </a>
      <div className={"card__info"}>
        <p className={"card__title"}>{film.nameRU}</p>
        <p className={"card__duration"}>{duration}</p>
      </div>
    </div>
  );
}
