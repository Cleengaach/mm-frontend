import React from "react";
import Card from "./card";
import "../assets/css/swiper-article.scss" 

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Articles = ({ articles }) => {

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={"auto"}
      className="swiper_article"
    >
      {articles.map((article, i) => {
        return (
          <SwiperSlide key={i}>
            <Card
              article={article}
              key={article.node.slug}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>

  );
};

export default Articles;