import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import Preloader from "../vendor/preloader/Preloader";

export default function Movies({
  handleFilmSave,
  handleFilmRemove,
  isLoading,
  handleLoading,
}) {
  const [films, setFilms] = React.useState([]);
  const [chosenFilms, setChosenFilms] = useState([]);
  const [displayedFilms, setDisplayedFilms] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [searchedOnce, setSearchedOnce] = useState(false);

  const [shortFilmsSelected, setShortFilmsSelected] = useState(false);

  React.useEffect(() => {
    handleLoading(true);
    if (localStorage.getItem("films")) {
      setFilms(JSON.parse(localStorage.getItem("films")));
      handleLoading(false);
    }
    return () => {
      setFilms([]);
      handleLoading(false);
    };
  }, []);

  const handleCheckboxSelected = () => {
    setShortFilmsSelected(!shortFilmsSelected);
  };

  const handleInputChange = (evt) => {
    setSearchWord(evt.target.value);
  };

  const handleSearch = (evt) => {
    evt.preventDefault();
    setSearchedOnce(true);
    handleLoading(true);
    setChosenFilms(
      films.filter((el) => {
        return el.nameRU.toLowerCase().includes(searchWord.toLowerCase());
      })
    );
    handleLoading(false);
  };

  useEffect(() => {
    if (shortFilmsSelected) {
      setDisplayedFilms(
        chosenFilms.filter((el) => {
          return el.duration <= 40;
        })
      );
    } else {
      setDisplayedFilms(chosenFilms);
    }
  }, [shortFilmsSelected, chosenFilms]);

  return (
    <section className={"movies"}>
      <SearchForm
        onInputChange={handleInputChange}
        onSearch={handleSearch}
        searchWord={searchWord}
        handleCheckboxSelected={handleCheckboxSelected}
        shortFilmsSelected={shortFilmsSelected}
      />
      {isLoading ? (
        <Preloader />
      ) : displayedFilms.length > 0 ? (
        <MoviesCardList
          films={displayedFilms}
          savedPage={false}
          handleFilmSave={handleFilmSave}
          handleFilmRemove={handleFilmRemove}
        />
      ) : (
        <p className={"filter__text"}>
          {searchedOnce ? "Ничего не найдено" : ""}
        </p>
      )}
    </section>
  );
}
