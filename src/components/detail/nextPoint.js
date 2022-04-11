import React from "react";
import "./nextPoint.scss";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const NextPoint = ({ data }) => {
    return (
        <Link to={`/bod/${data.point.slug}`} className="nextPoint_wrap">  
            <div className="nextPoint_image">
                <GatsbyImage
                    image={data.point.image.localFile.childImageSharp.gatsbyImageData}
                    alt={`Hero image`}
                    className="nextPoint_image_inner"
                    placeholder="blurred"
                />
            </div>
            <div className="nextPoint_main">
                <div className="nextPoint_title">
                    <b>
                        {data.point.title}
                    </b>
                    <small>
                        {data.point.altitude && data.point.altitude + " m.n.m."}
                    </small>
                </div>
            </div>
            <div className="nextPoint_time">
                <span className={data.farba}>{data.time.slice(0, 5)}</span>
            </div>
        </Link>
    );
};

export default NextPoint;