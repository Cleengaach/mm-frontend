import React from "react";
import Card from "./card";

const Articles = ({ articles }) => {

  return (

        <div className="tour-wrap">
          {articles.map((article, i) => {
            return (
              <Card
                article={article}
                key={article.node.slug}
              />
            );
          })}
        </div>

  );
};

export default Articles;