import React from "react";
import "../../assets/css/point-slider.scss";
import { GatsbyImage } from "gatsby-plugin-image";


import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const DetailPoints = ({ data }) => {
    return (
        <>
            <div className="point-slider-wrap">
                {data.map((point, i) => {
                    console.log(point);
                    return (

                            <div className="point-slider-item" key={i}>
                                <div className="point-slider-image">
                                    <GatsbyImage
                                        className="point-slider-image-inner"
                                        image={point.point.image.localFile.childImageSharp.gatsbyImageData}
                                        alt={point.point.image.name}
                                        placeholder="blurred"
                                    />
                                </div>
                                <div className="point-slider-text">
                                    {point.point.title}

                                </div>
                                <div className="point-slider-time">
                                    {point.farba}
                                    {point.time}
                                </div>
                                <div className="point-slider-overlay"></div>
                            </div>
                    );
                })}
            </div>
        </>
    );
};

export default DetailPoints;