import React from "react"
import { graphql } from "gatsby"
import "../assets/css/detail.scss";
import ArticlesComponent from "../components/articles";
import DetailItem from "../components/detail/detail-item";
import Levels from "../components/detail/levels";
import Photogallery from "../components/photogallery";
import { motion } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image";
import { Tabs } from "../components/tabs/tabs-anime";

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
    <>
      <motion.main
        className="tour_detail_main"
        initial={{
          opacity: 0
        }}
        animate={
          { opacity: 1 }
        }
        exit={
          { opacity: 0 }
        }
        transition={{ duration: 0.3 }}
      >
        <div className="tour_detail">
          <div className="tour_detail_header">
            <div className="tour_detail_header_title">
              <h1>
                <b>
                  {data.strapiRoutes.title}
                </b>
                <span>
                  {data.strapiRoutes.subtitle}
                </span>
              </h1>
              <Photogallery data={data.strapiRoutes.photogallery} thumb={data.thumbnails.photogallery} />

            </div>

            <GatsbyImage
              image={data.strapiRoutes.image.localFile.childImageSharp.gatsbyImageData}
              alt={`Hero image`}
              className="tour_detail_header_back--mobile"
              placeholder="blurred"
            />
          </div>
          <div className="tour_detail_content">

            <div className="tour_detail_content_column">
              <div className="tour_basic">

                <div className="tour_basic--collumn">
                  <DetailItem label={'dĺžka'} data={data.strapiRoutes.RouteLength} metric={'km'} />

                  <DetailItem label={'stúpanie'} data={data.strapiRoutes.stupanie} metric={'m'} />
                </div>

                <div className="tour_basic--collumn">
                  <DetailItem label={'čas'} data={data.strapiRoutes.TotalTime} metric={'h'} />

                  <DetailItem label={'klesanie'} data={data.strapiRoutes.klesanie} metric={'m'} />
                </div>

                <div className="tour_basic--collumn">
                  <Levels type="type" data={data.strapiRoutes.tourType} />

                  <Levels type="level" data={data.strapiRoutes.level} />
                </div>

              </div>
            </div>
            <div className="tour_detail_content_column">
              
              <Tabs map={data.strapiRoutes.mapJson} chart={data.strapiRoutes.mapJson.features} length={data.strapiRoutes.RouteLength} points={data.strapiRoutes.route_path}/>
            </div>

          </div>

        </div>
        <div>

          <ArticlesComponent articles={data.allStrapiRoutes.edges} />

        </div>
      </motion.main>
    </>
  )
}

export default UsingDSG
