import React, { useContext } from "react"
import { graphql } from "gatsby"
import "../assets/css/detail.scss";
import Card from "../components/card";
import DetailItem from "../components/detail/detail-item";
import Levels from "../components/detail/levels";
import Photogallery from "../components/photogallery";
import { GatsbyImage } from "gatsby-plugin-image";
import Seo from "../components/seo";
import MapWrap from "../components/detail/mapWrap";
import DetailPoints from "../components/detail/detail-points";
import DetailChartnew from "../components/detail/detail-chartnew";
import GetTime from "../components/function/getTime";

import { NavContext } from "../context/NavProvider";


export const query = graphql`
  query CestaQuery($slug: String!, $lengthMax: Float, $lengthMin: Float) {
    strapiRoute(slug: { eq: $slug }) {
      length
      level
      tourType
      Route_path {
        id
        farba
        time
        point {
          strapi_id
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
      region {
        title
      }
      title
      subtitle
      stupanie
      klesanie
      description { 
        data {
          description
        }
      }
      time
      Authors {
        author {
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
    thumbnails: strapiRoute(slug: {eq: $slug}) {
      photogallery {
            localFile {
              publicURL
              childImageSharp {
                  gatsbyImageData(layout: FIXED, placeholder: BLURRED)
              }
            }
          }
      }
    allStrapiRoute(filter: {length: {gte: $lengthMin, lte: $lengthMax}, slug: {ne: $slug}}) {
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
          Route_path {
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
console.log({data})

  return (
    <section className="tour_detail_main">
      <div className={show === true ? "tour_detail" : "tour_detail tour_detail--map"}>
        <div className="tour_detail_content_column tour_detail_header">
          <div className="tour_detail_header_title">
            <h1>
              <b>
                {data.strapiRoute.title}
              </b>
              <span>
                {data.strapiRoute.subtitle}
              </span>
            </h1>

            <div className="tour_detail_header_info">
              <Levels type="type" data={data.strapiRoute.tourType} />
              <Levels type="level" data={data.strapiRoute.level} />
            </div>
            {data.strapiRoute.photogallery ?
              <Photogallery data={data.strapiRoute.photogallery} thumb={data.thumbnails.photogallery} />
              : null}
          </div>

          <GatsbyImage
            image={data.strapiRoute.image.localFile.childImageSharp.gatsbyImageData}
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
            <DetailItem label={'dĺžka'} data={data.strapiRoute.length} metric={'km'} />
            <DetailItem label={'čas'} data={data.strapiRoute.time} metric={'h'} />
            <DetailItem label={'stúpanie'} data={data.strapiRoute.stupanie} metric={'m'} />
            <DetailItem label={'klesanie'} data={data.strapiRoute.klesanie} metric={'m'} />
          </div>
        </div>

        {data.strapiRoute.mapJson ?
          <div className="tour_detail_content_column tour_detail_content_map">
            <h4>
              Mapa trasy
            </h4>
            <MapWrap data={data.strapiRoute.mapJson} region={data.strapiRoute.region.title} mountain={data.strapiRoute.mountain} url={data.strapiRoute.map[0].url} />
          </div>
          : null}


        {data.strapiRoute.mapJson ?
          <div className="tour_detail_content_column">
            <h4>
              Výškový profil
            </h4>
            <DetailChartnew children={data.strapiRoute.mapJson.features} length={data.strapiRoute.length} />
          </div>
          : null}

        {data.strapiRoute.description !== null ?
          <div className="tour_detail_content_column">
            <h4>
              Popis trasy
            </h4>
            <p>
              {data.strapiRoute.description.data.description}
            </p>
            {data.strapiRoute.Authors.length > 0 ?
              <p className="tour_detail_user_wrap">
                <span className="tour_detail_user_label">túru pridal:</span>
                {data.strapiRoute.Authors.map((item, i) => {
                  return (
                    <span className="tour_detail_user" key={i}>
                      <GatsbyImage
                        image={item.author.thumbnail.localFile.childImageSharp.gatsbyImageData}
                        alt={`Hero image`}
                      />
                      <b>
                        {item.author.name}
                      </b>
                    </span>
                  );
                }
                )}
              </p>

              : null}

          </div>
          : null}


        {data.strapiRoute.Route_path.length > 0 ?
          <div className="tour_detail_content_column">
            <h4>
              Body trasy
            </h4>
            <DetailPoints data={data.strapiRoute.Route_path} />
          </div>
          : null}
        {data.allStrapiRoute.edges.length > 0 ?
          <div className="tour_detail_content_column">
            <h4>
              Podobné túry
            </h4>
            <div className="tour_detail_tips">

              {data.allStrapiRoute.edges.map((article, i) => {
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

export const Head = ({ data }) => {

  const seo = {
    metaTitle: data.strapiRoute.title + data.strapiRoute.subtitle,
    metaDescription: data.strapiRoute.description,
    shareImage: data.strapiRoute.image
  }
  return (
    <Seo title={seo.metaTitle} description={seo.metaDescription}>
      <meta property="og:image" content={seo.shareImage} />
    </Seo>
  );
}