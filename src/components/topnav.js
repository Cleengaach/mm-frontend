import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"
import * as navStyles from "./topnav.module.scss";
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { IconContext } from "react-icons";
import { ThemeToggler } from 'gatsby-plugin-dark-mode'


const TopNav = () => (
  <nav className={navStyles.nav}>
    <Link
      to="/"
    >
      <StaticImage src="../assets/images/logo-mm.svg" alt="Milión metrov" className={navStyles.logo} />
    </Link>


    <ThemeToggler >
      {({ theme, toggleTheme }) => {
        return (
          <div className={navStyles.themeToggle}>
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

export default TopNav;