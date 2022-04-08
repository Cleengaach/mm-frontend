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
  query BodQuery($slug: String!) {
    strapiPoints(slug: { eq: $slug }) {
      strapiId
      mountain {
        title
      }

      title
      description
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
          <div className="tour_detail_header">
            <div className="tour_detail_header_title">
              <h1>
                <b>
                  {data.strapiPoints.title}
                </b>
              </h1>
              <Photogallery data={data.strapiPoints.photogallery} thumb={data.thumbnails.photogallery} />

            </div>

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

           
         
          </div>
        </div>

      </motion.main>
    </>
  )
}

export default UsingDSG
