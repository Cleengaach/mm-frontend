import React from "react"
import { graphql } from "gatsby"
import "../assets/css/detail.scss";
import ArticlesComponent from "../components/articles";
import Photogallery from "../components/photogallery";
import { motion } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image";
import MapPoint from "../components/detail/mapPoint"
import NextPoint from "../components/detail/nextPoint";
import RouteInPoint from "../components/detail/routeInPoint";

export const query = graphql`
  query BodQuery($slug: String!) {
    strapiPoints(slug: { eq: $slug }) {
      strapiId
      title
      description
      altitude
      east
      north
      nextPoint {
        farba
        time
        point {
          title
          slug
          altitude
          image {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
              }
            }
          }
        }
      }
      mountain {
        title
      }
      image {
        localFile {
          publicURL
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
      HeroImage {
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
    allStrapiRoutes(filter: {route_path: {elemMatch: {point: {slug: {eq: $slug}}}}, slug: {ne: $slug}}) {
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
    thumbnails: strapiPoints(slug: {eq: $slug}) {
      photogallery {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData(layout: FIXED, placeholder: BLURRED)
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
        transition={{ duration: 0.25 }}
      >
        <div className="tour_detail">
          <div className="tour_detail_header point">
            <div className="tour_detail_header_title">
              <h1>
                <b>
                  {data.strapiPoints.title}
                </b>
                <span>
                  {data.strapiPoints.altitude && data.strapiPoints.altitude + " m.n.m."}
                </span>
              </h1>
              <Photogallery data={data.strapiPoints.photogallery} thumb={data.thumbnails.photogallery} />

            </div>
            <div className="tour_detail_header_gradient"></div>

            <GatsbyImage
              image={data.strapiPoints.image.localFile.childImageSharp.gatsbyImageData}
              alt={`Hero image`}
              className="tour_detail_header_back--mobile"
              placeholder="blurred"
            />
            {data.strapiPoints.HeroImage ? <GatsbyImage
              image={data.strapiPoints.HeroImage.localFile.childImageSharp.gatsbyImageData}
              alt={`Hero image`}
              className="tour_detail_header_back--desktop"
              placeholder="blurred"
            /> : null}
          </div>
          <div className="tour_detail_content">
            <div className="tour_detail_content_column">

              <div className="nextPoints">
                <h4>
                  Najbližšie body
                </h4>
                {data.strapiPoints.nextPoint.map((point, i) => {
                  return (
                    <NextPoint data={point} key={i} />
                  );
                })}
              </div>

              <div className="pointTours">
                <h4>Túry cez tento bod</h4>
                {data.allStrapiRoutes.edges.map((route, i) => {
                  return (
                    <RouteInPoint data={route} key={i} />
                  );
                })}
              </div>

            </div>
            <div className="tour_detail_content_column">
              <h4>
                Poloha bodu
              </h4>
              <div className="tour_detail_mapPoint">
                <MapPoint north={data.strapiPoints.north} east={data.strapiPoints.east} mountain={data.strapiPoints.mountain} />
              </div>
            </div>
          </div>
        </div>
        <div className="tour_tips">

        </div>
      </motion.main>
    </>
  )
}

export default UsingDSG
