import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Seo from "../components/seo";
import ArticlesComponent from "../components/articles";
import "../assets/css/main.scss";
import "../assets/leaflet/leaflet.css";
import { motion } from "framer-motion"

const IndexPage = () => {
  const data = useStaticQuery(query);

  return (
    <>
      <motion.main
        initial={{
          opacity: 0
        }}
        animate={
          { opacity: 1, scale: 1 }
        }
        exit={
          { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.3 }}
        className="home_main"
      >
        <Seo />
        <ArticlesComponent articles={data.allStrapiRoutes.edges} />
        <ArticlesComponent articles={data.allStrapiRoutes.edges} />
        <ArticlesComponent articles={data.allStrapiRoutes.edges} />
      </motion.main>
    </>
  );
};

const query = graphql`
      query {

        allStrapiRoutes {
        edges {
        node {
        strapiId
          slug
      title
      subtitle
      TotalTime
      RouteLength
      level
      mountain {
        title
      }
      stupanie
      route_path {
        time
      }
      image {
        localFile {
        childImageSharp {
        gatsbyImageData(
          width: 300
          height: 400
      placeholder: BLURRED
      formats: [AUTO, WEBP, AVIF]
      )
              }
            }
          }
        }
      }
    }
  }
      `;

export default IndexPage;
