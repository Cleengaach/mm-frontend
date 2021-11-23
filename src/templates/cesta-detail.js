import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const query = graphql`
  query CestaQuery($slug: String!, $RouteLengthMax: Float, $RouteLengthMin: Float) {
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
      title
      stupanie
      description
      date
      TotalTime
      thumbnail {
        localFile {
          publicURL
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
    allStrapiRoutes(filter: {RouteLength: {gte: $RouteLengthMin, lte: $RouteLengthMax}, slug: {ne: $slug}}) {
      nodes {
        id
        slug
        title
      }
    }
  }
`

const UsingDSG = ({ data }) => {
  const podobne = data.allStrapiRoutes.nodes
  return (
    <Layout>
      <Seo title={data.strapiRoutes.title} />
      <h1>{data.strapiRoutes.title}</h1>
      <p>{data.strapiRoutes.description}</p>
      <p>{data.strapiRoutes.RouteLength}</p>

      <Link to="/">Go back to the homepage</Link>

      <ul>
        {podobne.map((item, i) => {
          return (
            <li key={item.id}>
              <Link to={`/cesta/${item.slug}`}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  )
}

export default UsingDSG
