import React from "react";
import "./nextPoint.scss";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import Triangel from '../../assets/images/level.inline.svg'

const Easy = () => {
    return (
        <>
            <Triangel />
            <small>ľahká</small>
        </>
    )
}
const Medium = () => {
    return (
        <>
            <Triangel />
            <small>stredná</small>
        </>
    )
}
const Hard = () => {
    return (
        <>
            <Triangel />
            <small>ťažká</small>
        </>
    )
}
const Ferrata = () => {
    return (
        <>
            <Triangel />
            <small>ferata</small>
        </>
    )
}
const Guided = () => {
    return (
        <>
            <Triangel />
            <small>s vodcom</small>
        </>
    )
}
const Level = ({ level }) => {
    return (
        <div className="nextPoint_level_inner">
            {level === 'easy' ? <Easy /> : null}
            {level === 'medium' ? <Medium /> : null}
            {level === 'hard' ? <Hard /> : null}
            {level === 'ferrata' ? <Ferrata /> : null}
            {level === 'guided' ? <Guided /> : null}
        </div>
    )
}

const RouteInPoint = ({ data }) => {
    return (
        <Link to={`/cesta/${data.node.slug}`} className="nextPoint_wrap">
            <div className="nextPoint_image big">
                <GatsbyImage
                    image={data.node.image.localFile.childImageSharp.gatsbyImageData}
                    alt={`Hero image`}
                    className="nextPoint_image_inner"
                    placeholder="blurred"
                />
            </div>
            <div className="nextPoint_main">
                <div className="nextPoint_title">
                    <b>
                        {data.node.title}
                    </b>
                    <span>
                        {data.node.subtitle}
                    </span>
                </div>
                <div className="nextPoint_info">
                    <span>
                        {data.node.RouteLength} km
                    </span>
                    <span>
                        {data.node.TotalTime} h
                    </span>
                    <span>
                        + {data.node.stupanie} m
                    </span>
                </div>

            </div>
            <div className="nextPoint_level">
                <Level level={data.node.level} />
            </div>

        </Link>
    );
};

export default RouteInPoint;