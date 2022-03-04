import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Seo from "./seo";
import Nav from "./nav";


const Layout = ({ children, seo }) => (
  <StaticQuery
    query={graphql`
      query {
        strapiHomepage {
          seo {
            metaTitle
            metaDescription
            shareImage {
              localFile {
                publicURL
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Nav />
        <main>{children}</main>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;