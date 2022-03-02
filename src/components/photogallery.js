import React, { useCallback, useEffect, useRef, useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import LightGallery from 'lightgallery/react';

// import plugins if you need
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';

// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import 'lightgallery/css/lg-thumbnail.css';

import "../assets/css/detail-gallery.scss";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Photogallery = ({ data, thumb }) => {


    const lightGallery = useRef(null);

    var newArr = [];
    for (var i = 0; i < thumb.length; i++) {
        newArr = newArr.concat({ 'src': thumb[i].localFile.publicURL, 'exThumb': thumb[i].localFile.publicURL,'thumb': thumb[i].localFile.publicURL, 'id': i });
    }
    const [items, setItems] = useState(newArr);

    const openGallery = (i) => (event) => {
        lightGallery.current.openGallery(i);
    };

    const onInit = useCallback((detail) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);


    return (
        <div className="tour_mapWrap_gallery">
            <LightGallery
                dynamic
                dynamicEl={items}
                onInit={onInit}
                startAnimationDuration={500}
                speed={500}
                thumbnail={true}
                plugins={[lgThumbnail, lgZoom]}
            ></LightGallery>

            <Swiper
                slidesPerView={"auto"}
                spaceBetween={3}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
            >
                {data.map((photo, i) => {
                    return (
                        <SwiperSlide key={i}>
                                <GatsbyImage
                                    onClick={openGallery(i)}
                                    image={photo.localFile.childImageSharp.gatsbyImageData}
                                    alt={photo.name}
                                    placeholder="blurred"
                                />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
         </div>

    );
};

export default Photogallery;