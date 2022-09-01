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

  //const metres = data.Author.sum * 1000;

  return (
    <>
      <Seo
        seo={data.strapiHomepage.seo}
      />
      <main className="home_main" >
        {/*}
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
              {metres} metrov
            </b>
          </div>
          <div className="home_cont_item">
            <span>
              nájdete tu
            </span>
            <b>
              {data.allStrapiRoutes.totalCount} túr
            </b>
          </div>
        </div>
  {*/}
        <div className="home_list">
          {data.allStrapiRoutes.edges.map((item, i) => {
            return (
              <Card article={item} />
            );
          })}
        </div>
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
        #Author: allStrapiRoutes(
        #  filter: {Author: {elemMatch: {authors: {elemMatch: {name: {eq: "Monika a Martin"}}}}}}
        #) {
        #  edges {
        #    node {
        #      id
        #      RouteLength
        #    }
        #  }
        #  sum(field: RouteLength)
        #}
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
      totalCount
    }
  }
      `;

export default IndexPage;
