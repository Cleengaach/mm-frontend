import React, { useContext } from "react"
import { graphql } from "gatsby"
import "../assets/css/detail.scss";
import Card from "../components/card";
import DetailItem from "../components/detail/detail-item";
import Levels from "../components/detail/levels";
import Photogallery from "../components/photogallery";
import { GatsbyImage } from "gatsby-plugin-image";

import MapWrap from "../components/detail/mapWrap";
import DetailPoints from "../components/detail/detail-points";
import DetailChartnew from "../components/detail/detail-chartnew";

import { NavContext } from "../context/NavProvider";


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
          altitude
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
      regions {
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
      HeroImage {
        localFile {
          publicURL
          childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
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
  }
`

const UsingDSG = ({ data }) => {

  const { show, setShow } = useContext(NavContext);

  return (
      <section className="tour_detail_main">
        <div className={show === true ? "tour_detail" : "tour_detail tour_detail--map"}>
          <div className="tour_detail_content_column tour_detail_header">
            <div className="tour_detail_header_title">
              <h1>
                <b>
                  {data.strapiRoutes.title}
                </b>
                <span>
                  {data.strapiRoutes.subtitle}
                </span>
              </h1>

              <div className="tour_detail_header_info">
                <Levels type="type" data={data.strapiRoutes.tourType} />
                <Levels type="level" data={data.strapiRoutes.level} />
              </div>

              <Photogallery data={data.strapiRoutes.photogallery} thumb={data.thumbnails.photogallery} />

            </div>

            <GatsbyImage
              image={data.strapiRoutes.image.localFile.childImageSharp.gatsbyImageData}
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
              <DetailItem label={'dĺžka'} data={data.strapiRoutes.RouteLength} metric={'km'} />
              <DetailItem label={'čas'} data={data.strapiRoutes.TotalTime} metric={'h'} />
              <DetailItem label={'stúpanie'} data={data.strapiRoutes.stupanie} metric={'m'} />
              <DetailItem label={'klesanie'} data={data.strapiRoutes.klesanie} metric={'m'} />
            </div>
          </div>

          {data.strapiRoutes.mapJson ?
            <div className="tour_detail_content_column tour_detail_content_map">
              <h4>
                Mapa trasy
              </h4>
              <MapWrap data={data.strapiRoutes.mapJson} region={data.strapiRoutes.regions} mountain={data.strapiRoutes.mountain} />
            </div>
            : null}


          {data.strapiRoutes.mapJson.features.length > 0 ?
            <div className="tour_detail_content_column">
              <h4>
                Výškový profil
              </h4>
              <DetailChartnew children={data.strapiRoutes.mapJson.features} length={data.strapiRoutes.RouteLength} />
            </div>
            : null}

          {data.strapiRoutes.route_path.length > 0 ?
            <div className="tour_detail_content_column">
              <h4>
                Body trasy
              </h4>
              <DetailPoints data={data.strapiRoutes.route_path} />
            </div>
            : null}

          {data.allStrapiRoutes.edges.length > 0 ?
            <div className="tour_detail_content_column">
              <h4>
                Podobné túry
              </h4>
              <div className="tour_detail_tips">

                {data.allStrapiRoutes.edges.map((article, i) => {
                  return (
                    <Card
                      article={article}
                      key={article.node.slug}
                    />
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
