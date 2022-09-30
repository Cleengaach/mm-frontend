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
            strapi_id
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
  data.allStrapiRoute.edges.forEach(edge => {
    const slug = edge.node.slug
    actions.createPage({
      path: '/navigacia/' + slug,
      component: path.resolve('./src/templates/navigacia.js'),
      context: {
        slug: slug
      },
    })
  })

  data.allStrapiPoint.edges.forEach(edge => {
    const slug = edge.node.slug
    const id = edge.node.strapi_id
    actions.createPage({
      path: '/bod/'+ id + '/' + slug,
      component: path.resolve('./src/templates/bod-detail.js'),
      context: {
        slug: slug
      },
    })
  })
}


