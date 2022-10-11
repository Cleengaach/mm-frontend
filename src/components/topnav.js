import React, { useState, useContext } from "react";
import { Link } from "gatsby";
import "./topnav.scss";
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Logo from '../assets/images/mm-logo.inline.svg'
import { FiSearch } from 'react-icons/fi'

import { NavContext } from "../context/NavProvider";

const TopNav = ({ location }) => {
  const [isVisible, setIsVisible] = useState(false);

  function toogleVisible() {
    setIsVisible(!isVisible);
  }

  console.log(location);
  const { show, setShow } = useContext(NavContext);

  return (
    <nav className={show === true ? "nav" : "nav hide"}>

      <Link
        to="/"
      >
        <Logo className="logo" />
      </Link>
      <Link
        to="/search/"
        className="nav_icon"
      >
        <FiSearch />
      </Link>

      <ThemeToggler >
        {({ theme, toggleTheme }) => {
          return (
            <div className={theme === "dark" ? "themeToggle dark" : "themeToggle light"}>
              <div className={theme === "light" ? "active" : null}>
                <MdLightMode onClick={() => theme === "dark" ? toggleTheme('light') : toggleTheme('dark')} />
              </div>
              <div className={theme === "dark" ? "active" : null}>
                <MdDarkMode onClick={() => theme === "dark" ? toggleTheme('light') : toggleTheme('dark')} />
              </div>
            </div>
          )
        }}
      </ThemeToggler>
    </nav >
  );
};

export default TopNav;