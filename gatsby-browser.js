import React from 'react';
import NavProvider from './src/context/NavProvider';
import Layout from "./src/components/layout";
import "@fontsource/roboto-condensed"; // Defaults to weight 400.
import "@fontsource/roboto"

export const wrapRootElement = NavProvider
export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>
    {element}
  </Layout>
);


export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  // transition duration from `layout.js` * 1000 to get time in ms
  // * 2 for exit + enter animation
  const TRANSITION_DELAY = 0.3 * 1000

  // if it's a "normal" route
  if (location.action === "PUSH") {
    window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY)
  }

  // if we used the browser's forwards or back button
  else {
    const savedPosition = getSavedScrollPosition(location) || [0, 0]

    window.setTimeout(() => window.scrollTo(...savedPosition), TRANSITION_DELAY)
  }

  return false
}
