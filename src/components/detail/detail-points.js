import React from "react";
import "../../assets/css/point-slider.scss";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const DetailPoints = ({ data }) => {
    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="point-slider-wrap"
            >
                {data.map((point, i) => {
                    return (
                        <SwiperSlide className="point-slider-item" key={i} style={{ zIndex: data.length - i }}>
                            <Link to={`/bod/${point.point.slug}`} className="point-slider-link">
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
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
};

export default DetailPoints;