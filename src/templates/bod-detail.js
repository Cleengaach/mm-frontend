import React, { useContext } from "react"
import { graphql } from "gatsby"
import "../assets/css/detail.scss";
import Photogallery from "../components/photogallery";
import DetailItem from "../components/detail/detail-item";
import { GatsbyImage } from "gatsby-plugin-image";
import MapPoint from "../components/detail/mapPoint"
import NextPoint from "../components/detail/nextPoint";
import Card from "../components/card";
import { NavContext } from "../context/NavProvider";

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
  const { show, setShow } = useContext(NavContext);

  const poloha = "N - " + data.strapiPoints.north + " / E - " + data.strapiPoints.east;

  return (
    <section className="tour_detail_main">
      <div className={show === true ? "tour_detail point" : "tour_detail tour_detail--map point"}>
        <div className="tour_detail_content_column tour_detail_header">
          <div className="tour_detail_header_title">
            <h1>
              <b>
                {data.strapiPoints.title}
              </b>

              {data.strapiPoints.mountain.title.length > 0 ?
                <span>pohorie {data.strapiPoints.mountain.title}</span>
                : null
              }

            </h1>
            <Photogallery data={data.strapiPoints.photogallery} thumb={data.thumbnails.photogallery} />

          </div>

          <GatsbyImage
            image={data.strapiPoints.image.localFile.childImageSharp.gatsbyImageData}
            alt={`Hero image`}
            className="tour_detail_header_back--mobile"
            placeholder="blurred"
          />

        </div>
        <div className="tour_detail_content_column">
          <h4>
            Základné informácie
          </h4>

          <div className="tour_basic">
            <DetailItem label={'nadmorská výška'} data={data.strapiPoints.altitude} metric={'m.n.m.'} />
            <DetailItem label={'poloha'} data={poloha} metric={''} />
          </div>
        </div>
        <div className="tour_detail_content_column tour_detail_content_map">
          <h4>
            Poloha bodu
          </h4>
          <MapPoint north={data.strapiPoints.north} east={data.strapiPoints.east} mountain={data.strapiPoints.mountain} />
        </div>

        {data.strapiPoints.nextPoint.length > 0 ?
          <div className="tour_detail_content_column nextPoints">
            <h4>
              Najbližšie body
            </h4>
            <div className="nextPoints_wrap">
              {data.strapiPoints.nextPoint.map((point, i) => {
                return (
                  <NextPoint data={point} key={i} />
                );
              })}
            </div>
          </div>
          : null}

        {data.allStrapiRoutes.edges.length > 0 ?
          <div className="tour_detail_content_column pointTours">
            <h4>Túry cez tento bod</h4>
            <div className="tour_detail_tips">
              {data.allStrapiRoutes.edges.map((route, i) => {
                return (
                  <Card article={route} key={i} />
                );
              })}
            </div>
          </div>
          : null}

      </div>

    </section>
  )
}

export default UsingDSG
