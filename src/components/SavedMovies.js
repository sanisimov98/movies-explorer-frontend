import MoviesCardList from "./MoviesCardList";
import SearchForm from "./SearchForm";
import { useState, useEffect } from "react";
import Preloader from "../vendor/preloader/Preloader";

export default function SavedMovies({
  films,
  handleFilmRemove,
  handleFilmSave,
  isLoading,
  handleLoading,
}) {
  const [displayedFilms, setDisplayedFilms] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [searchedOnce, setSearchedOnce] = useState(false);

  const [shortFilmsSelected, setShortFilmsSelected] = useState(false);

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
    if (searchWord !== "") {
      setDisplayedFilms(
        films.filter((el) => {
          return el.nameRU.toLowerCase().includes(searchWord.toLowerCase());
        })
      );
    }
    handleLoading(false);
  };

  useEffect(() => {
    setDisplayedFilms(films);
  }, [films]);

  useEffect(() => {
    if (shortFilmsSelected) {
      setDisplayedFilms(
        films.filter((el) => {
          return el.duration <= 40;
        })
      );
    } else {
      setDisplayedFilms(films);
    }
  }, [shortFilmsSelected]);

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
          savedPage={true}
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
