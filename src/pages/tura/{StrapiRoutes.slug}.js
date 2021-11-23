import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Moment from "react-moment"
import Layout from "../../components/layout"
import Markdown from "react-markdown"

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
  return (
    <Layout seo={seo}>
      <div>
        <div style={{ display: "grid" }}>
          <GatsbyImage
            style={{
              gridArea: "1/1",
            }}
            alt={`Picture for ${article.title} article`}
            image={article.thumbnail.localFile.childImageSharp.gatsbyImageData}
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