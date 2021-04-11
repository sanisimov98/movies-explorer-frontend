import React from "react";
import { Route, Switch, BrowserRouter, useHistory } from "react-router-dom";
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
            setIsLoggedIn(true);
            setCurrentUser(res);
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
  }, [isLoggedIn, history]);

  React.useEffect(() => {
    if (!localStorage.getItem("films") && isLoggedIn) {
      handleLoading(true);
      Promise.all([moviesApi.getFilms()])
        .then(([initialFilms]) => {
          localStorage.setItem("films", JSON.stringify(initialFilms));
          handleLoading(false);
        })
        .catch((err) => {
          console.log(err);
          handleLoading(false);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      handleLoading(true);
      Promise.all([api.getSavedFilms()])
        .then(([initialSavedFilms]) => {
          if (initialSavedFilms.data) {
            setSavedFilms(initialSavedFilms.data);
            handleLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          handleLoading(false);
        });
    }
  }, [isLoggedIn]);

  const loginHandler = (email, password) => {
    return auth
      .authorise(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          history.push(ROUTES_MAP.FILMS);
        }
        if (data.message) {
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerHandler = (email, password, name) => {
    return auth
      .register(email, password, name)
      .then((data) => {
        return auth
          .authorise(email, password)
          .then((res) => {
            if (res.token) {
              setIsLoggedIn(true);
              history.push(ROUTES_MAP.FILMS);
            }
            if (res.message) {
              return res;
            }
            return data;
          })
          .catch((err) => console.log(err));
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
    api
      .removeFilm(film)
      .then((res) => {
        const updatedSaved = savedFilms.filter((f) => film._id !== f._id);
        setSavedFilms(updatedSaved);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (values) => {
    return api
      .setProfileData(values)
      .then((userdata) => {
        setCurrentUser(userdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    history.push(ROUTES_MAP.MAIN);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (!permissionChecked) {
    return null;
  }
  if (permissionChecked) {
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <div className="page">
            <Header isLoggedIn={isLoggedIn} />
            <Switch>
              <Route exact path={ROUTES_MAP.SIGN_IN}>
                <Login onLogin={loginHandler} isLoggedIn={isLoggedIn} />
              </Route>
              <Route exact path={ROUTES_MAP.SIGN_UP}>
                <Register
                  onRegister={registerHandler}
                  isLoggedIn={isLoggedIn}
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
              />
              <Route>
                <NotFound />
              </Route>
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
