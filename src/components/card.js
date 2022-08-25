import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import * as cardStyles from "./card.module.scss";
import { Link } from "gatsby";
import * as detailStyles from "./detail/detail-item.module.scss";
import Triangel from '../assets/images/level.inline.svg'
import Levels from "./detail/levels";

const Card = ({ article }) => {
  let time;
  if (article.node.TotalTime === "0" || article.node.TotalTime === "false") {
    const checkNull = article.node.time.slice(0, 1);
    if (checkNull === "0") {
      time = article.node.time.slice(1, 5);
    } else {
      time = article.node.time.slice(0, 5);
    }

  } else {
    time = article.node.TotalTime
  }

  return (
    <Link
      to={`/cesta/${article.node.slug}`}
      //to="/about"
      className={cardStyles.tourItem}
    >

      <div className={cardStyles.tourTop}>
        <Levels type="level" data={article.node.level} />
        <Levels type="type" data={article.node.tourType} />
      </div>
      <div className={cardStyles.tourText}>
        <div className={cardStyles.tourTitle}>
          <small id="title">
            {article.node.mountain.title}
          </small>
          <b>
            {article.node.title}
          </b>
          <span id="subtitle">
            {article.node.subtitle}
          </span>
        </div>
        <div id="category" className={cardStyles.tourInfo}>
          <div className={cardStyles.infoItem}>
            <b>{article.node.RouteLength} </b>
            <small>km</small>
          </div>
          <div className={cardStyles.infoItem}>
            <b>{time} </b>
            <small>h</small>
          </div>
          <div className={cardStyles.infoItem}>
            <b>+ {article.node.stupanie} </b>
            <small>m</small>
          </div>
        </div>
      </div>
      <div className={cardStyles.tourOverlay}></div>
      <div className={cardStyles.tourImage}>
        <GatsbyImage
          image={article.node.image.localFile.childImageSharp.gatsbyImageData}
          alt={`Hero image`}
          className={cardStyles.inner}
          placeholder="blurred"
        />
      </div>
    </Link>
  );
};

export default Card;