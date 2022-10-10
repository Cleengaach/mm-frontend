import React, { useContext } from "react"
import { graphql } from "gatsby"
import "../assets/css/detail.scss";
import Photogallery from "../components/photogallery";
import DetailItem from "../components/detail/detail-item";
import { GatsbyImage } from "gatsby-plugin-image";
import MapPoint from "../components/detail/mapPoint"
import Seo from '../components/seo';
import Card from "../components/card";
import { NavContext } from "../context/NavProvider";

export const query = graphql`
  query BodQuery($slug: String!) {
    strapiPoint(slug: { eq: $slug }) {
      title
      description {
        data {
          description
        }
      }
      altitude
      east
      north
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
    allStrapiRoute(filter: {Route_path: {elemMatch: {point: {slug: {eq: $slug}}}}, slug: {ne: $slug}}) {
      edges {
        node {
          slug
          title
          subtitle
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
    thumbnails: strapiPoint(slug: {eq: $slug}) {
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

  return (
    <section className="tour_detail_main">
      <div className={show === true ? "tour_detail point" : "tour_detail tour_detail--map point"}>
        <div className="tour_detail_content_column tour_detail_header">
          <div className="tour_detail_header_title">
            <h1>
              <b>
                {data.strapiPoint.title}
              </b>
            </h1>

            {data.strapiPoint.mountain.title.length > 0 ?
              <div className="tour_detail_header_title_location">
                pohorie {data.strapiPoint.mountain.title}
              </div>
              : null
            }


          </div>

          <GatsbyImage
            image={data.strapiPoint.image.localFile.childImageSharp.gatsbyImageData}
            alt={`Hero image`}
            className="tour_detail_header_back--mobile"
            placeholder="blurred"
          />

        </div>
        <div className="tour_detail_content_column">
          <div className="tour_basic">
            <DetailItem label={'nadmorská výška'} data={data.strapiPoint.altitude} metric={'m.n.m.'} />
            <DetailItem label={'GPS north'} data={data.strapiPoint.north} metric={''} />
            <DetailItem label={'GPS east'} data={data.strapiPoint.east} metric={''} />
          </div>
        </div>
        {data.strapiPoint.photogallery ?
          <div className="tour_detail_content_column">
            <Photogallery data={data.strapiPoint.photogallery} thumb={data.thumbnails.photogallery} />
          </div>
          : null}

        <div className="tour_detail_content_column tour_detail_content_map">
          <h4>
            Poloha bodu
          </h4>
          <MapPoint north={data.strapiPoint.north} east={data.strapiPoint.east}  />
        </div>
        {/*}
        {data.strapiPoint.nextPoint.length > 0 ?
          <div className="tour_detail_content_column nextPoints">
            <h4>
              Najbližšie body
            </h4>
            <div className="nextPoints_wrap">
              {data.strapiPoint.nextPoint.map((point, i) => {
                return (
                  <NextPoint data={point} key={i} />
                );
              })}
            </div>
          </div>
          : null}
            {*/}
        {data.allStrapiRoute.edges.length > 0 ?
          <div className="tour_detail_content_column pointTours">
            <h4>Túry cez tento bod</h4>
            <div className="tour_detail_tips">
              {data.allStrapiRoute.edges.map((route, i) => {
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

export const Head = ({ data }) => {

  const seo = {
    metaTitle: data.strapiPoint.title,
    metaDescription: data.strapiPoint.description,
    shareImage: data.strapiPoint.image
  }
  console.log(seo, 'seo')
  return (
    <Seo title={seo.metaTitle} description={seo.metaDescription}>
      <meta property="og:image" content={seo.shareImage} />
    </Seo>
  );
}