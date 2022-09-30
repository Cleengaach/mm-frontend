
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
{/*}

  apiURL: "https://milionmetrov.up.railway.app",
  accessToken: "730d86e9c0ad5508b50ad0efa710a0bc03fc77cb16eea7a8e188f11f08aa0a7e9aee3a3588b2bf65760726d0ce6c1808d294131dfd00d0aaee0f1a111a7aa8559e6c08591e00f76bad430064f9f69f8e308c3b71388420ee8e359ddec02e2c7511a11a4b848fa0c1083ee1329ea520b5fe205f9a5aee959e1b1d1a30da871db",
{*/}
const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL ? "https://milionmetrov.up.railway.app" : "http://localhost:1337",
  accessToken: process.env.STRAPI_TOKEN,
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
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
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
