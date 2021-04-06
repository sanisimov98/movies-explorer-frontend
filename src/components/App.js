import React from "react";
import {
  Route,
  Switch,
  BrowserRouter,
  useHistory,
  Redirect,
} from "react-router-dom";
import { ROUTES_MAP } from "../utils/routesMap";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Movies from "./Movies";
import SavedMovies from "./SavedMovies";
import Profile from "./Profile";
import NotFound from "./NotFound";
import Preloader from "../vendor/preloader/Preloader";
import moviesData from "../data/moviesData";
import moviesApi from "../utils/MoviesApi";

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [films, setFilms] = React.useState([]);
  const [chosenFilms, setChosenFilms] = React.useState([]);
  const [savedFilms, setSavedFilms] = React.useState([]);

  React.useEffect(() => {
    moviesApi.getFilms().then((res) => {
      console.log(res);
      setFilms(res);
    });
  }, []);

  const loginHandler = () => {
    setIsLoggedIn(true);
    history.push(ROUTES_MAP.FILMS);
  };

  const registerHandler = () => {
    history.push(ROUTES_MAP.SIGN_IN);
  };

  const handleFilmSave = (film) => {
    setSavedFilms([...savedFilms, film]);
  };

  const handleFilmRemove = (film) => {
    const updatedSaved = savedFilms.filter((f) => film.id !== f.id);
    setSavedFilms(updatedSaved);
  };

  return (
    <BrowserRouter>
      <div className="page">
        <Switch>
          <Route path={ROUTES_MAP.SIGN_IN}>
            <Login onLogin={loginHandler} isLoggedIn={isLoggedIn} />
          </Route>
          <Route path={ROUTES_MAP.SIGN_UP}>
            <Register onRegister={registerHandler} isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path={ROUTES_MAP.MAIN}>
            <Header isLoggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </Route>
          <Route path={ROUTES_MAP.FILMS}>
            <Header isLoggedIn={isLoggedIn} />
            <Movies
              films={chosenFilms}
              handleFilmSave={handleFilmSave}
              handleFilmRemove={handleFilmRemove}
            />
            <Footer />
          </Route>
          <Route path={ROUTES_MAP.SAVED_FILMS}>
            <Header isLoggedIn={isLoggedIn} />
            <SavedMovies
              films={savedFilms}
              handleFilmSave={handleFilmSave}
              handleFilmRemove={handleFilmRemove}
            />
            <Footer />
          </Route>
          <Route path={ROUTES_MAP.PROFILE}>
            <Header isLoggedIn={isLoggedIn} />
            <Profile />
            <Footer />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
