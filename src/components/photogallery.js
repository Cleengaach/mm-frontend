import React, { useCallback, useRef, useState } from "react";
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


const Photogallery = ({ data, thumb }) => {


    const lightGallery = useRef(null);

    var newArr = [];
    for (var i = 0; i < thumb.length; i++) {
        newArr = newArr.concat({ 'src': thumb[i].localFile.publicURL, 'exThumb': thumb[i].localFile.publicURL, 'thumb': thumb[i].localFile.publicURL, 'id': i });
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

    const Count = ({ loop, photo }) => {

        const imgHide = data.length - 4;
        let showMore = false;
        if (imgHide > 0) {
            showMore = true;
        }

        if (loop < 4) {
            return (
                <div className="tour_mapWrap_gallery_item" key={loop} onClick={openGallery(loop)}>
                    {loop === 3 && showMore === true ? <span className="showMore">+{imgHide}</span> : null}
                    <GatsbyImage
                        image={photo.localFile.childImageSharp.gatsbyImageData}
                        alt={photo.name}
                        placeholder="blurred"
                    />
                </div>
            );
        } else {
            return null;
        }
    }

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

            {data.map((photo, i) => {
                return (
                    <Count loop={i} key={i} photo={photo} />
                );
            })}
        </div>

    );
};

export default Photogallery;