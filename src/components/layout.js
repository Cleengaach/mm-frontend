import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import TopNav from "./topnav";
import { motion, AnimatePresence } from 'framer-motion';

const duration = 0.5

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: duration,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration },
  },
}

const Layout = ({ children, location = "" }) => (
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
        <TopNav location={location} />
        <main>
          {children}
        </main>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;