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
}

exports.onCreateWebpackConfig = ({ actions, plugins, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        path: require.resolve("path-browserify"),
      },
      fallback: {
        fs: false,
      },
    },
  })
  if (stage === "build-javascript" || stage === "develop") {
    actions.setWebpackConfig({
      plugins: [plugins.provide({ process: "process/browser" })],
    })
  }
}
