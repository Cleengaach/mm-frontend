import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import ArticlesComponent from "../components/articles";
import "../assets/css/main.scss";
import "../assets/leaflet/leaflet.css";

const IndexPage = () => {
  const data = useStaticQuery(query);

  return (
    <Layout>
      <Seo />
      <ArticlesComponent articles={data.allStrapiRoutes.edges} />
    </Layout>
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
    allStrapiArticle {
      edges {
        node {
          strapiId
          slug
          title
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 660)
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
