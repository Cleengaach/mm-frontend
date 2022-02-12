import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../assets/css/detail.scss";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import Moment from "react-moment"
import ArticlesComponent from "../components/articles";


export const query = graphql`
  query CestaQuery($slug: String!, $RouteLengthMax: Float, $RouteLengthMin: Float) {
    strapiRoutes(slug: { eq: $slug }) {
      strapiId
      RouteLength
      itineration
      level
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
        }
      }
      map {
        url
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
  const podobne = data.allStrapiRoutes.edges

  const [starsCount, setStarsCount] = useState(0)
  const [geoJsonKey, setGeoJsonKey] = useState("initialKey123abc")
  const path = data.strapiRoutes.route_path

  var map = ''
  if (data.strapiRoutes.map !== null) {
    map = data.strapiRoutes.map.url
    var maplat = "";
    var maplon = "";
    path.forEach((element, i) => {
      if (i === 1) {
        maplat = element.point.north
        maplon = element.point.east
      }
    });
  }

  useEffect(() => {
    // get data from GitHub api
    const newKey = "makeKey(10)"
    console.log(newKey, 'key')
    setGeoJsonKey(newKey)

    fetch(map)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setStarsCount(resultData.features)
      }) // set data for the number of stars
  }, [])

  let newDate = new Date().getTime()


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

          <div className="tour_basic">

            <div className="tour_basic--collumn">

              <div className="tour_basic_item">
                <small>
                  dĺžka
                </small>
                <b>
                  {data.strapiRoutes.RouteLength}
                </b>
                <span>
                  km
                </span>
              </div>

              <div className="tour_basic_item">
                <small>
                  čas
                </small>
                <b>
                  {data.strapiRoutes.TotalTime}
                </b>
                <span>
                  h
                </span>
              </div>

            </div>

            <div className="tour_basic--collumn">

              <div className="tour_basic_item">

                <small>
                  stúpanie
                </small>
                <b>
                  {data.strapiRoutes.stupanie}
                </b>
                <span>
                  m
                </span>
              </div>

              <div className="tour_basic_item">
                <small>
                  klesanie
                </small>
                <b>
                  {data.strapiRoutes.klesanie}
                </b>
                <span>
                  m
                </span>
              </div>

            </div>

            <div className="tour_basic--collumn">

              <div className="tour_basic_item">
                <small>
                  pohorie
                </small>
                <span>
                  {data.strapiRoutes.mountain.title}
                </span>
              </div>

              <div className="tour_basic_item">
                <small>
                  kraj
                </small>
                <span>
                  {data.strapiRoutes.mountain.title}
                </span>
              </div>

            </div>

          </div>

          <p>{data.strapiRoutes.RouteLength}</p>
        </div>
        <div className="tour_detail_map">
          <MapContainer center={[maplat, maplon]} zoom={14} scrollWheelZoom={true} style={{ height: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON key={newDate} data={starsCount} />
          </MapContainer>

        </div>
      </div>
      <div>
        {podobne.map((item, i) => {
          return (
            <ArticlesComponent articles={data.allStrapiRoutes.edges} />
          );
        })}
      </div>
    </Layout>
  )
}

export default UsingDSG
