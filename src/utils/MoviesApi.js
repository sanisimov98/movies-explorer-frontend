class MoviesApi {
  constructor(options) {
    this._options = options;
  }

  handleResponse = (res) => {
    if (res.ok) {
      return res;
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  getFilms = () => {
    return fetch(`${this._options.baseURL}`, {
      headers: this._options.headers,
    }).then((res) => {
      this.handleResponse(res);
      return res.json();
    });
  };
}

const baseurl = "https://api.nomoreparties.co/beatfilm-movies";
const moviesApi = new MoviesApi({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
