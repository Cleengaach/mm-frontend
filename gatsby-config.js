
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const strapiConfig = {
  apiURL: "https://milionmetrov.up.railway.app",
  accessToken: '6fcc6d57c70f2375021ca2f9dedc89b4ae5e556103b6d4aed7884202475c0fe25908f23ea942a64f3ef63bd99cd0f472cffe89f09e2d2a57b797838a1fad6159e25756b23c2fa3c280f18da2b96496204949f371c62d6a437af52c0ac6c7b3b27ec3570e17af1c8890a131043c4d419930b065921486c79d255933eefb16aa64',
  collectionTypes: ['author',
    {
      singularName: 'route',
      queryParams: {
        // Populate media and relations
        // Make sure to not specify the fields key so the api always returns the updatedAt
        populate: {
          image: '*',
          photogallery: '*',
          mountain: '*',
          region: '*',
          map: '*',
          Authors: {
            populate: {
              author: {
                populate: {
                  thumbnail: '*',
                },
              },
            },
          },
          Route_path: {
            populate: {
              point: {
                image: '*',
              },
            },
          },
        },
      },
    },
    {
      singularName: 'point',
      queryParams: {
        // Populate media and relations
        // Make sure to not specify the fields key so the api always returns the updatedAt
        populate: {
          image: '*',
          photogallery: '*',
          mountain: '*',
        },
      },
    },
  ],
  singleTypes: [
    {
    singularName: 'homepage',
    queryParams: {
      // Populate media and relations
      // Make sure to not specify the fields key so the api always returns the updatedAt
      populate: {
        hero: '*',
        seo: {
          populate: {
            shareImage: '*',
          },
        }
      },
    },
  },
    {
    singularName: 'global',
    queryParams: {
      // Populate media and relations
      // Make sure to not specify the fields key so the api always returns the updatedAt
      populate: {
        siteName: '*',
        favicon: '*',
        defaultSeo: {
          populate: {
            shareImage: '*',
          },
        }
      },
    },
  },
],
};

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-image`, 'gatsby-plugin-dark-mode',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
  ],
}
