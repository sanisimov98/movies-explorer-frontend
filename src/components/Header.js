import React from "react";
import Logo from "../images/logo.svg";
import iconMain from "../images/icon-main.svg";
import { Link } from "react-router-dom";
import { ROUTES_MAP } from "../utils/routesMap";
import Login from "./Login";
import MenuIcon from "../images/menu__icon.svg";
import CloseIcon from "../images/close-button.svg";
import Navigation from "./Navigation";

export default function Header({ isLoggedIn }) {
  const [menuOpened, setMenuOpened] = React.useState(false);

  const handleMenuOpen = () => {
    setMenuOpened(!menuOpened);
  };
  return (
    <header className={"header"}>
      <div className={"header__container"}>
        <Link to={ROUTES_MAP.MAIN}>
          <img className={"header__logo"} alt={"Лого"} src={Logo} />
        </Link>
        {isLoggedIn ? (
          <img
            className={"header__films-icon"}
            alt={"Открыть меню"}
            src={menuOpened ? CloseIcon : MenuIcon}
            onClick={handleMenuOpen}
          />
        ) : (
          <></>
        )}

        <Navigation
          isLoggedIn={isLoggedIn}
          menuOpened={menuOpened}
          handleMenuOpen={handleMenuOpen}
        />
      </div>
    </header>
  );
}
