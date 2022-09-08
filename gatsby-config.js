
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const strapiConfig = {
  apiURL: "https://milionmetrov.up.railway.app",
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
