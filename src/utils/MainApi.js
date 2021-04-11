import { ROUTES_MAP } from "./routesMap";

class MainApi {
  constructor(options) {
    this._options = options;
  }

  tokenUpdate = (token) => {
    this._options.headers.authorization = `Bearer ${token}`;
    return Promise.resolve();
  };

  handleResponse = (res) => {
    if (res.ok) {
      return res;
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  setProfileData = (values) => {
    return fetch(`${ROUTES_MAP.BASE_URL}${ROUTES_MAP.PROFILE}`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: values.name,
        email: values.email,
      }),
    }).then((res) => {
      this.handleResponse(res);
      return res.json();
    });
  };

  getSavedFilms = () => {
    return fetch(`${ROUTES_MAP.BASE_URL}${ROUTES_MAP.FILMS}`, {
      method: "GET",
      headers: this._options.headers,
    }).then((res) => {
      this.handleResponse(res);
      return res.json();
    });
  };

  saveFilm = ({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
  }) => {
    const imageURL = `https://api.nomoreparties.co${image.url}`;
    const imageThumbnail = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;
    console.log(imageThumbnail, imageURL);
    return fetch(`${ROUTES_MAP.BASE_URL}${ROUTES_MAP.FILMS}`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: imageURL,
        trailer: trailerLink,
        nameRU: nameRU,
        nameEN: nameEN,
        thumbnail: imageThumbnail,
      }),
    })
      .then((res) => {
        this.handleResponse(res);
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  removeFilm = ({ _id }) => {
    return fetch(`${ROUTES_MAP.BASE_URL}${ROUTES_MAP.FILMS}/${_id}`, {
      method: "DELETE",
      headers: this._options.headers,
    })
      .then((res) => {
        this.handleResponse(res);
        return res.json();
      })
      .catch((err) => console.log(err));
  };
}

const api = new MainApi({
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
