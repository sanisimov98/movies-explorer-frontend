import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { ROUTES_MAP } from "../utils/routesMap";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Movies from "./Movies";
import SavedMovies from "./SavedMovies";
import Profile from "./Profile";
import NotFound from "./NotFound";
import api from "../utils/MainApi";
import * as auth from "../utils/auth";
import { ProtectedRoute } from "./ProtectedRoute";
import moviesApi from "../utils/MoviesApi";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [savedFilms, setSavedFilms] = React.useState([]);
  const [permissionChecked, setPermissionChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [initialFilms, setInitialFilms] = React.useState([]);
  const [error, setError] = React.useState("");
  const [successText, setSuccessText] = React.useState("");

  const handleLoading = (loadingState) => {
    setIsLoading(loadingState);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            api.tokenUpdate(token);
            setCurrentUser(res);
            setIsLoggedIn(true);
            setPermissionChecked(true);
          } else {
            localStorage.removeItem("token");
            return;
          }
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false);
      setPermissionChecked(true);
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (isLoggedIn && token) {
      handleLoading(true);
      Promise.all([moviesApi.getFilms(), api.getSavedFilms(token)])
        .then(([initFilms, initialSavedFilms]) => {
          if (initFilms) {
            setInitialFilms(initFilms);
          }
          if (initialSavedFilms.data) {
            setSavedFilms(initialSavedFilms.data);
          }
          handleLoading(false);
        })
        .catch((err) => {
          console.log(err);
          handleLoading(false);
        });
    }
  }, [isLoggedIn]);

  const loginHandler = (email, password) => {
    setError("");
    return auth
      .authorise(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          history.push(ROUTES_MAP.FILMS);
        }
        if (data.message) {
          setError(data.message);
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerHandler = (email, password, name) => {
    setError("");
    return auth
      .register(email, password, name)
      .then((data) => {
        if (data.email && data.name) {
          return auth.authorise(email, password).then((res) => {
            if (res.token) {
              setIsLoggedIn(true);
              history.push(ROUTES_MAP.FILMS);
            }
            if (res.message) {
              setError(res.message);
              return res;
            }
            return data;
          });
        } else {
          setError(data.message);
          return data;
        }
      })
      .catch((err) => console.log(err));
  };

  const handleFilmSave = (film) => {
    api
      .saveFilm(film)
      .then((res) => {
        if (res.data) {
          setSavedFilms([...savedFilms, res.data]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleFilmRemove = (film) => {
    if (film._id) {
      api
        .removeFilm(film._id)
        .then((res) => {
          const updatedSaved = savedFilms.filter((f) => film._id !== f._id);
          setSavedFilms(updatedSaved);
        })
        .catch((err) => console.log(err));
    } else if (film.id) {
      const filmId = savedFilms.filter((f) => {
        return f.movieId === film.id;
      });
      api
        .removeFilm(filmId[0]._id)
        .then((res) => {
          const updatedSaved = savedFilms.filter(
            (f) => filmId[0]._id !== f._id
          );
          setSavedFilms(updatedSaved);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateUser = (values) => {
    setError("");
    return api
      .setProfileData(values)
      .then((userdata) => {
        setCurrentUser(userdata);
        setSuccessText("Данные успешно изменены!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    history.push(ROUTES_MAP.MAIN);
    setInitialFilms([]);
    setSavedFilms([]);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  if (!permissionChecked) {
    return null;
  }
  if (permissionChecked) {
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header isLoggedIn={isLoggedIn} />
          <Switch>
            <Route exact path={ROUTES_MAP.SIGN_IN}>
              <Login
                onLogin={loginHandler}
                isLoggedIn={isLoggedIn}
                error={error}
              />
            </Route>
            <Route exact path={ROUTES_MAP.SIGN_UP}>
              <Register
                onRegister={registerHandler}
                isLoggedIn={isLoggedIn}
                error={error}
              />
            </Route>
            <Route exact path={ROUTES_MAP.MAIN}>
              <Main />
            </Route>
            <ProtectedRoute
              exact
              path={ROUTES_MAP.FILMS}
              isLoggedIn={isLoggedIn}
              component={Movies}
              initialFilms={initialFilms}
              savedFilms={savedFilms}
              handleFilmSave={handleFilmSave}
              handleFilmRemove={handleFilmRemove}
              isLoading={isLoading}
              handleLoading={handleLoading}
            />
            <ProtectedRoute
              exact
              path={ROUTES_MAP.SAVED_FILMS}
              isLoggedIn={isLoggedIn}
              films={savedFilms}
              component={SavedMovies}
              handleFilmSave={handleFilmSave}
              handleFilmRemove={handleFilmRemove}
              isLoading={isLoading}
              handleLoading={handleLoading}
            />
            <ProtectedRoute
              exact
              path={ROUTES_MAP.PROFILE}
              isLoggedIn={isLoggedIn}
              component={Profile}
              onUpdate={handleUpdateUser}
              onLogout={handleLogout}
              successText={successText}
            />
            <Route path={"*"}>
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
