import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"
import * as navStyles from "./nav.module.scss";


const Nav = () => (
  <nav className={navStyles.nav}>
    <Link to={`/`}>
      <StaticImage src="../assets/images/logo.svg" alt="Milión metrov" className={navStyles.logo} />
    </Link>

    <Link to={`/tura/`} className={navStyles.navItem}>
      <div>
        <StaticImage src="../assets/images/onas.png" alt="O nás"  />
        <span>
          o nás
        </span>
      </div>
    </Link>

    <Link to={`/tura/`} className={navStyles.navItem}>
      <div>

        <StaticImage src="../assets/images/tury-icon.svg" alt="Túry"  />
        <span>
          túry
        </span>
      </div>
    </Link>

    <Link to={`/tura/`} className={navStyles.navItem}>
      <div>

        <StaticImage src="../assets/images/blog-icon.svg" alt="Blog"  />
        <span>
          blog
        </span>
      </div>
    </Link>

    <Link to={`/tura/`} className={navStyles.navItem}>
      <div>

        <StaticImage src="../assets/images/tipy-icon.svg" alt="Tipy" />
        <span>
          tipy
        </span>
      </div>
    </Link>

    <Link to={`/tura/`} className={navStyles.navItem}>
      <div>

        <StaticImage src="../assets/images/flag-icon.svg" alt="Vrchy"  />
        <span>
          vrchy
        </span>
      </div>
    </Link>

    <Link to={`/tura/`} className={navStyles.navItem}>
      <div>

        <StaticImage src="../assets/images/hory-icon.svg" alt="Pohoria" />
        <span>
          pohoria
        </span>
      </div>
    </Link>
  </nav >
);

export default Nav;