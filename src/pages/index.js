import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ArticlesComponent from "../components/articles";
import "../assets/css/main.scss";
import "../assets/leaflet/leaflet.css";
import Seo from '../components/seo';

const IndexPage = () => {
  const data = useStaticQuery(query);

  return (
    <>
      <Seo
        seo={data.strapiHomepage.seo}
      />
      <main className="home_main" >
        <ArticlesComponent articles={data.allStrapiRoutes.edges} />
      </main>
    </>
  );
};

const query = graphql`
      query {
        strapiHomepage {
          hero {
            title
          }
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
        allStrapiRoutes {
        edges {
          node {
            strapiId
              slug
              title
              subtitle
              TotalTime
              time
              RouteLength
              level
              tourType
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
