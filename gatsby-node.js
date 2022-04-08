const { node } = require("prop-types")
const path = require("path")

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allStrapiRoutes {
        edges {
          node {
            slug
            RouteLength
          }
        }
      }
      allStrapiPoints {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  data.allStrapiRoutes.edges.forEach(edge => {
    const slug = edge.node.slug
    const range = edge.node.RouteLength * 0.15
    const RouteLengthMax = edge.node.RouteLength + range
    const RouteLengthMin = edge.node.RouteLength - range
    actions.createPage({
      path: '/cesta/' + slug,
      component: path.resolve('./src/templates/cesta-detail.js'),
      context: {
        slug: slug,
        RouteLengthMax: RouteLengthMax,
        RouteLengthMin: RouteLengthMin
      },
    })
  })

  data.allStrapiPoints.edges.forEach(edge => {
    const slug = edge.node.slug
    actions.createPage({
      path: '/bod/' + slug,
      component: path.resolve('./src/templates/bod-detail.js'),
      context: {
        slug: slug
      },
    })
  })
}


