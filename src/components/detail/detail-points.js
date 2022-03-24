import React from "react";
import "../../assets/css/point-slider.scss";
import { GatsbyImage } from "gatsby-plugin-image";

import { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const DetailPoints = ({ data }) => {
    return (
        <>
            <Swiper
                slidesPerView={3}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="point-slider-wrap"
            >
                {data.map((point, i) => {
                    return (
                        <SwiperSlide className="point-slider-item" key={i} style={{ zIndex: data.length - i }}>
                            <div className="point-slider-image">
                                <GatsbyImage
                                    className="point-slider-image-inner"
                                    image={point.point.image.localFile.childImageSharp.gatsbyImageData}
                                    alt='asdfsa'
                                    placeholder="blurred"
                                />
                            </div>
                            <div className="point-slider-text">
                                {point.point.title}

                            </div>
                            {(data.length - 1) !== i ?
                                <div className="point-slider-time">
                                    <span className={point.farba}>
                                        {point.time.slice(0, 5)}
                                    </span>
                                </div>
                                : null}
                            <div className="point-slider-overlay"></div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
};

export default DetailPoints;