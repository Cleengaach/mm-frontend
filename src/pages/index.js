import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ArticlesComponent from "../components/articles";
import "../assets/css/main.scss";
import "../assets/css/homemain.scss";
import "../assets/leaflet/leaflet.css";
import Seo from '../components/seo';
import Card from "../components/card";

const IndexPage = () => {
  const data = useStaticQuery(query);

  const metres = data.Author.sum * 1000;

  return (
    <>
      <main className="home_main" >
        <h1>
          Ahoooj 😀
        </h1>
        <p>

          sme Monika a Martin, máme radi hory <br />a chceme spolu prejsť milióny metrov
        </p>
        <div className="home_cont">
          <div className="home_cont_item">
            <span>
              spolu sme už prešli
            </span>
            <b>
              {metres.toLocaleString('fr')} metrov
            </b>
          </div>
          <div className="home_cont_item">
            <span>
              nájdete tu
            </span>
            <b>
              {data.allStrapiRoute.totalCount} túr
            </b>
          </div>
        </div>
        <div className="home_list">
          {data.allStrapiRoute.edges.map((item, i) => {
            return (
              <Card article={item} />
            );
          })}
        </div>
        {/*
        <ArticlesComponent articles={data.allStrapiRoute.edges} />
        */}
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
        Author: allStrapiRoute(
          filter: {Authors: {elemMatch: {author: {name: {eq: "Monika a Martin"}}}}}
        ) {
          sum(field: length)
        }
        allStrapiRoute {
        edges {
          node {
              slug
              title
              subtitle
              time
              length
              level
              tourType
              mountain {
                title
              }
              stupanie
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
      totalCount
    }
  }
      `;


/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
