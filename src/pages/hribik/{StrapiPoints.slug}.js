import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Moment from "react-moment"
import Layout from "../../components/layout"
import Markdown from "react-markdown"

export const query = graphql`
  query PointsQuery($slug: String!) {
    strapiPoints(slug: { eq: $slug }) {
      strapiId
      title
      slug
      nextPoint {
        farba
        id
        time
        point {
          title
          slug
        }
      }
      image {
        localFile {
          publicURL
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
    allStrapiRoutes(filter: {route_path: {elemMatch: {point: {slug: {eq: $slug}}}}, slug: {ne: $slug}}) {
      edges {
        node {
          id
          title
          slug
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
    }
  }
`

const Article = ({ data }) => {
  const article = data.strapiPoints
  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.thumbnail,
    article: true,
  }
  const points = data.strapiPoints.nextPoint 

  const routes = data.allStrapiRoutes.edges
   const uniqueTags = [];
  const uniqeRoutes = new Array;
  routes.map(e => {
    if (uniqueTags.indexOf(e.node.id) === -1) {
      uniqueTags.push(e.node.id)
      uniqeRoutes.push({ id: e.node.id, title: e.node.title, thumbnail: e.node.thumbnail, slug: e.node.slug })
    }
  });

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
          nadmorska vyska - {article.altitude}
        </div>
        <div className="uk-section">
          suradnice - {article.longitude}, {article.latitude}
        </div>
        <h3>
          Najblizsie body
        </h3>
        <ul>
          {points.map((pointItem, i) => {
            return (
              <li key={pointItem.id}>
                <Link to={`/hribik/${pointItem.point.slug}`}>{pointItem.point.title}</Link>
              </li>
            );
          })}
        </ul>
        <h3>
          Cesty ktore vedu cez tento hribik
        </h3>
        <ul>
          {routes.map((pointItem, i) => { 
            return (
              <li key={pointItem.node.id}>
                <Link to={`/tura/${pointItem.node.slug}`}>{pointItem.node.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default Article