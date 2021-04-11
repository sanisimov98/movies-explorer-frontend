import { ROUTES_MAP } from "./routesMap.js";

export const register = (email, password, name) => {
  return fetch(`${ROUTES_MAP.BASE_URL}${ROUTES_MAP.SIGN_UP}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  })
    .then((res) => {
      try {
        if (res.status === 201 || res.status === 200) {
          return res.json();
        }
        if (res.status === 400) {
          throw new Error("Введены неверные данные");
        }
        if (res.status === 409) {
          throw new Error("Этот адрес электронной почты уже используется");
        }
      } catch (err) {
        return err;
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authorise = (email, password) => {
  return fetch(`${ROUTES_MAP.BASE_URL}${ROUTES_MAP.SIGN_IN}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
      if (data.message) {
        return data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getContent = (token) => {
  return fetch(`${ROUTES_MAP.BASE_URL}${ROUTES_MAP.PROFILE}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });
};
