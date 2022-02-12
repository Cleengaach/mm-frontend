import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Moment from "react-moment"
import Layout from "../../components/layout"
import Markdown from "react-markdown"
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'

export const query = graphql`
  query ArticleQuery($slug: String!) {
    strapiRoutes(slug: { eq: $slug }) {
      strapiId
      RouteLength
      itineration
      klesanie
      route_path {
        id
        farba
        time
        point {
          id
          slug
          title
        }
      }
      map {
        url
      }
      title
      stupanie
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
    }
  }
`
const Article = ({ data }) => {
  const article = data.strapiRoutes
  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.thumbnail,
    article: true,
  }
  const path = data.strapiRoutes.route_path

  var map = ''
  if (data.strapiRoutes.map !== null) {
    map = data.strapiRoutes.map.url
    var maplat = "";
    var maplon = "";
    path.forEach((element, i) => {
      if (i === 1) {
        maplat = element.point.latitude
        maplon = element.point.longitude
      }
    });
  }
  console.log(map,'map')


  const [starsCount, setStarsCount] = useState(0)
  const [geoJsonKey, setGeoJsonKey] = useState("initialKey123abc")

  useEffect(() => {
    // get data from GitHub api
    const newKey = "makeKey(10)"
    console.log(newKey,'key')
    setGeoJsonKey(newKey)

    fetch(map)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setStarsCount(resultData.features)
      }) // set data for the number of stars
  }, [])

  let newDate = new Date().getTime()

  return (
    <Layout seo={seo}>
      <div>
        <div style={{ display: "grid" }}>
          <GatsbyImage
            style={{
              gridArea: "1/1",
            }}
            alt={`Picture for ${article.title} article`}
            image={article.image.localFile.childImageSharp.gatsbyImageData}
            layout="fullWidth"
          />
          <div
            style={{
              // By using the same grid area for both, they are stacked on top of each other
              gridArea: "1/1",
              position: "relative",
              // This centers the other elements inside the hero component
              placeItems: "center",
              display: "grid",
            }}
          >
            <h1 style={{ color: `white` }}>{article.title}</h1>
          </div>
        </div>
        <div className="uk-section">
          <div className="uk-container uk-container-small">
            <Markdown children={article.description} escapeHtml={false} />

            <hr className="uk-divider-small" />

          </div>
        </div>
        <div className="uk-section">
          <Moment format="MMM Do YYYY">{article.date}</Moment>
        </div>
        <div className="uk-section">
          pocet opakovani - {article.itineration}
        </div>

        <MapContainer center={[48.33708, 18.09879]} zoom={14} scrollWheelZoom={true} style={{ height: "400px" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON key={newDate} data={starsCount} />
        </MapContainer>

        <ul>
          {path.map((pathItem, i) => {
            return (
              <li key={pathItem.id}>
                <Link to={`/hribik/${pathItem.point.slug}`}>{pathItem.point.title}</Link> - {pathItem.farba} / {pathItem.time}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default Article