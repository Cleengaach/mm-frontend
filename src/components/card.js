import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const Card = ({ article }) => {
  return (
    <Link to={`/tura/${article.node.slug}`} className="uk-link-reset">
      <div className="uk-card uk-card-muted">
        <div className="uk-card-media-top">
          <GatsbyImage
            image={article.node.thumbnail.localFile.childImageSharp.gatsbyImageData}
            alt={`Hero image`}
          />
        </div>
        <div className="uk-card-body">
          <p id="category" className="uk-text-uppercase">
            {article.node.RouteLength} km / čas - {article.node.TotalTime}
          </p>
          <p id="title" className="uk-text-large">
            {article.node.title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;