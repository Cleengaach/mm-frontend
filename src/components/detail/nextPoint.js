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
                </div>
                <div className="nextPoint_info">
                    <div className="nextPoint_time">
                        <small>
                            čas
                        </small>
                        <span>{data.time.slice(0, 5)}</span>
                    </div>
                    <div className="nextPoint_color">
                        <small>
                            farba
                        </small>
                        <span ><i className={data.farba}></i></span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NextPoint;