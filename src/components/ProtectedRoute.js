import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ROUTES_MAP } from "../utils/routesMap.js";

export const ProtectedRoute = ({
  component: Component,
  isLoggedIn,
  ...props
}) => {
  return (
    <Route>
      {() =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={ROUTES_MAP.SIGN_IN} />
        )
      }
    </Route>
  );
};
