exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
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