import React, { useState, useContext } from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"
import "./topnav.scss"; 
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { IconContext } from "react-icons";
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

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
        <StaticImage src="../assets/images/logo-mm.svg" alt="Milión metrov" className="logo" />
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