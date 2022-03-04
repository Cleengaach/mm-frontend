import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "../assets/css/detail.scss";
import ArticlesComponent from "../components/articles";


export const query = graphql`
  query CestaQuery($slug: String!, $RouteLengthMax: Float, $RouteLengthMin: Float) {
    strapiRoutes(slug: { eq: $slug }) {
      strapiId
      RouteLength
      itineration
      level
      tourType
      route_path {
        id
        farba
        time
        point {
          id
          slug
          title
          north
          east
          image {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
      map {
        url
      }
      mapJson {
        features {
          type
          geometry {
            coordinates
            type
          }
          properties {
            name
          }
        }
        type
      } 
      mountain {
        title
      }
      title
      subtitle
      stupanie
      klesanie
      description
      date
      TotalTime
      image {
        localFile {
          publicURL
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
      photogallery {
        name
        localFile {
          publicURL
          childImageSharp {
            gatsbyImageData(height: 400, placeholder: BLURRED)
          }
        }
      }
    }
    thumbnails: strapiRoutes(slug: {eq: $slug}) {
      photogallery {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData(layout: FIXED, placeholder: BLURRED)
              }
            }
          }
      }
    allStrapiRoutes(filter: {RouteLength: {gte: $RouteLengthMin, lte: $RouteLengthMax}, slug: {ne: $slug}}) {
      edges {
        node {
          strapiId
          slug
          title
          subtitle
          TotalTime
          RouteLength
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
  }
`

const UsingDSG = ({ data }) => {

  return (
    <Layout>

      <div className="tour_detail">
        <div className="tour_detail_content">
          <h1>
            <b>
              {data.strapiRoutes.title}
            </b>
            <span>
              {data.strapiRoutes.subtitle}
            </span>
          </h1>

          <h2>
            Základné info
          </h2>

         
        </div>

      </div>
      <div>

        <ArticlesComponent articles={data.allStrapiRoutes.edges} />

      </div>
    </Layout>
  )
}

export default UsingDSG
