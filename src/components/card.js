import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import * as cardStyles from "./card.module.scss";
import { Link } from "gatsby";
import LevelsCard from "./levelsCard";

const Card = ({ article }) => { 
  
  return (
    <Link
      to={`/cesta/${article.node.slug}`}
      //to="/about"
      className={cardStyles.tourItem}
    >

      <div className={cardStyles.tourTop}>
        <LevelsCard type="level" data={article.node.level} />
        <LevelsCard type="type" data={article.node.tourType} />
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
            <b>{article.node.length} </b>
            <small>km</small>
          </div>
          <div className={cardStyles.infoItem}>
            <b>{article.node.time} </b>
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