import React, { useState, useContext } from "react";
import { Link } from "gatsby";
import "./topnav.scss";
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { IconContext } from "react-icons";
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Logo from '../assets/images/mm-logo.inline.svg'
import { FiSearch } from 'react-icons/fi'

import { NavContext } from "../context/NavProvider";

const TopNav = () => {
  const [isVisible, setIsVisible] = useState(false);

  function toogleVisible() {
    setIsVisible(!isVisible);
  }

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
            <div className="themeToggle">
              {theme === "dark" ?
                <IconContext.Provider value={{ size: "2rem" }}>
                  <MdLightMode onClick={() => theme === "dark" ? toggleTheme('light') : toggleTheme('dark')} />
                </IconContext.Provider>
                :
                <IconContext.Provider value={{ size: "2rem" }}>
                  <MdDarkMode onClick={() => theme === "dark" ? toggleTheme('light') : toggleTheme('dark')} />
                </IconContext.Provider>
              }
            </div>
          )
        }}
      </ThemeToggler>
    </nav >
  );
};

export default TopNav;