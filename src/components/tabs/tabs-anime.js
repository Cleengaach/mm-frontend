import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../assets/css/tabs.scss"

import MapWrap from "../detail/mapWrap";
import DetailPoints from "../detail/detail-points";
import DetailChartnew from "../detail/detail-chartnew";

const variants = {
  enter: () => {
    return {
      opacity: 0
    };
  },
  center: {
    opacity: 1
  },
  exit: (direction) => {
    return {
      opacity: 0
    };
  }
};

const tabs = [
  { title: "Mapa", body: "map" },
  { title: "Profil", body: "chart" }, 
  { title: "Body", body: "points" }
];

export const Tabs = ({map,chart, length, points}) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  // const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="container">
        <ul className="tabs-header">
          {tabs.map(({ title }, i) => {
            const isActive = i === page;
            return (
              <li
                key={i}
                className={isActive ? "active-header" : ""}
                onClick={() => {
                  // set page and determin which direction we're going
                  console.log("we are on page", page, "and want to go to", i);
                  setPage([i, i - page]);
                }}
              >
                <h4>{title}</h4>
                {isActive && (
                  <motion.div className="underline" layoutId="underline" />
                )}
              </li>
            );
          })}
          <div className="underline-bg" />
        </ul>
        <AnimatePresence initial={false} custom={direction}> 
          <motion.section
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, duration: 2 },
              opacity: { duration: 0.2 }
            }}
            >
            {tabs[page].body === "map" ? <MapWrap data={map}/> : null}
            {tabs[page].body === "chart" ? <DetailChartnew children={chart} length={length} /> : null}
            {tabs[page].body === "points" ? <DetailPoints data={points}/> : null}
          </motion.section>
        </AnimatePresence>
    </div>
  );
};
