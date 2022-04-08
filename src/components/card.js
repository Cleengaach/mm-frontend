import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import * as cardStyles from "./card.module.scss";
import { Link } from "gatsby";
import * as detailStyles from "./detail/detail-item.module.scss";
import Triangel from '../assets/images/level.inline.svg'

const Easy = () => {
  return (
    <div>
      <Triangel className={detailStyles.tour_level_easy} />
      <small>ľahká</small>
    </div>
  )
}
const Medium = () => {
  return (
    <div>
      <Triangel className={detailStyles.tour_level_medium} />
      <small>stredná</small>
    </div>
  )
}
const Hard = () => {
  return (
    <div>
      <Triangel className={detailStyles.tour_level_hard} />
      <small>ťažká</small>
    </div>
  )
}
const Ferrata = () => {
  return (
    <div>
      <Triangel className={detailStyles.tour_level_hard} />
      <small>ferata</small>
    </div>
  )
}
const Guided = () => {
  return (
    <div>
      <Triangel className={detailStyles.tour_level_hard} />
      <small>s vodcom</small>
    </div>
  )
}
const Level = ({level}) => {
  return (
    <>
      {level === 'easy' ? <Easy /> : null}
      {level === 'medium' ? <Medium /> : null}
      {level === 'hard' ? <Hard /> : null}
      {level === 'ferrata' ? <Ferrata /> : null}
      {level === 'guided' ? <Guided /> : null}
    </>
  )
}

const Card = ({ article }) => {
  return (
    <Link
      to={`/cesta/${article.node.slug}`}
      //to="/about"
      className={cardStyles.tourItem}
    >

      <div className={cardStyles.tourLevel}>
        <span>
         <Level level={article.node.level} />
        </span>
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
            <b>{article.node.TotalTime} </b>
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