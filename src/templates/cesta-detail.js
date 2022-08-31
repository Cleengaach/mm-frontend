import React, { useContext } from "react"
import { graphql } from "gatsby"
import "../assets/css/detail.scss";
import Card from "../components/card";
import DetailItem from "../components/detail/detail-item";
import Levels from "../components/detail/levels";
import Photogallery from "../components/photogallery";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import Seo from "../components/seo";
import MapWrap from "../components/detail/mapWrap";
import DetailPoints from "../components/detail/detail-points";
import DetailChartnew from "../components/detail/detail-chartnew";
import GetTime from "../components/function/getTime";

import { NavContext } from "../context/NavProvider";


export const query = graphql`
  query CestaQuery($slug: String!, $RouteLengthMax: Float, $RouteLengthMin: Float) {
    strapiRoutes(slug: { eq: $slug }) {
      strapiId
      RouteLength
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
      TotalTime
      time
      Author {
        authors {
          name
          thumbnail {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 32, height: 32, placeholder: BLURRED)
              }
            }
          }
        }
        date
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
          url
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

  const seo = {
    metaTitle: data.strapiRoutes.title + data.strapiRoutes.subtitle,
    metaDescription: data.strapiRoutes.description,
    shareImage: data.strapiRoutes.image
  }
  const time = GetTime(data.strapiRoutes.TotalTime, data.strapiRoutes.time);

  console.log(data.strapiRoutes, 'author')

  return (
    <>

      <Seo
        seo={seo}
      />
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
              <DetailItem label={'čas'} data={time} metric={'h'} />
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

          {data.strapiRoutes.description !== null ?
            <div className="tour_detail_content_column">
              <h4>
                Popis trasy
              </h4>
              <p>
                {data.strapiRoutes.description}
              </p>
              {data.strapiRoutes.Author.length > 0 ?
                <p className="tour_detail_user_wrap">
                  <span className="tour_detail_user_label">túru pridal:</span>
                  {data.strapiRoutes.Author.map((authorData, i) => {
                    return (
                        authorData.authors.map((author, i) => {
                          return (
                            <span className="tour_detail_user">
                              <GatsbyImage
                                image={author.thumbnail.localFile.childImageSharp.gatsbyImageData}
                                alt={`Hero image`}
                              />
                              <b>
                                {author.name}
                              </b>
                            </span>
                          );
                        })
                    );
                  }
                  )}
                </p>

                : null}

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
    </>
  )
}

export default UsingDSG
