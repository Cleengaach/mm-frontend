const { node } = require("prop-types")
const path = require("path")

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allStrapiRoute {
        edges {
          node {
            slug
            length
          }
        }
      }
      allStrapiPoint {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  data.allStrapiRoute.edges.forEach(edge => {
    const slug = edge.node.slug
    const range = edge.node.length * 0.15
    const lengthMax = edge.node.length + range
    const lengthMin = edge.node.length - range
    actions.createPage({
      path: '/cesta/' + slug,
      component: path.resolve('./src/templates/cesta-detail.js'),
      context: {
        slug: slug,
        lengthMax: lengthMax,
        lengthMin: lengthMin
      },
    })
  })

  data.allStrapiPoint.edges.forEach(edge => {
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


