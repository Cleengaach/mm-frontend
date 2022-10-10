import React from "react";
import * as detailStyles from "./detail-item.module.scss";
import { BsFillTriangleFill } from 'react-icons/bs';
import { BiInfoCircle } from 'react-icons/bi';

function getLevelLabel(data) {
    switch (data) {
        case 'easy':
            return 'ľahká';
        case 'medium':
            return 'stredná';
        case 'hard':
            return 'ťažká';
        case 'ferrata':
            return 'ferrata';
        case 'guided':
            return 's vodcom';
        case 'kids':
            return 's deťmi';
    }
}
function getLevelIcon(data) {
    switch (data) {
        case 'easy':
            return (
                <>
                    <BsFillTriangleFill className={detailStyles.tour_level_easy} />
                    <BsFillTriangleFill className={detailStyles.tour_level_empty} />
                    <BsFillTriangleFill className={detailStyles.tour_level_empty} />
                    <BsFillTriangleFill className={detailStyles.tour_level_empty} />
                </>
            );
        case 'medium':
            return (
                <>
                    <BsFillTriangleFill className={detailStyles.tour_level_medium} />
                    <BsFillTriangleFill className={detailStyles.tour_level_medium} />
                    <BsFillTriangleFill className={detailStyles.tour_level_empty} />
                    <BsFillTriangleFill className={detailStyles.tour_level_empty} />
                </>
            );
        case 'hard':
            return (
                <>
                    <BsFillTriangleFill className={detailStyles.tour_level_hard} />
                    <BsFillTriangleFill className={detailStyles.tour_level_hard} />
                    <BsFillTriangleFill className={detailStyles.tour_level_hard} />
                    <BsFillTriangleFill className={detailStyles.tour_level_empty} />
                </>
            );
        case 'ferrata':
            return (
                <>
                    <BsFillTriangleFill className={detailStyles.tour_level_top} />
                    <BsFillTriangleFill className={detailStyles.tour_level_top} />
                    <BsFillTriangleFill className={detailStyles.tour_level_top} />
                    <BsFillTriangleFill className={detailStyles.tour_level_top} />
                </>
            );
        case 'guided':
            return (
                <>
                    <BsFillTriangleFill className={detailStyles.tour_level_top} />
                    <BsFillTriangleFill className={detailStyles.tour_level_top} />
                    <BsFillTriangleFill className={detailStyles.tour_level_top} />
                    <BsFillTriangleFill className={detailStyles.tour_level_top} />
                </>
            );
        case 'kids':
            return (
                <>
                    <BsFillTriangleFill className={detailStyles.tour_level_easy} />
                    <BsFillTriangleFill className={detailStyles.tour_level_empty} />
                    <BsFillTriangleFill className={detailStyles.tour_level_empty} />
                    <BsFillTriangleFill className={detailStyles.tour_level_empty} />
                </>
            );
    }
}


const TourLevel = ({ label, data }) => {
    return (
        <div className={detailStyles.tour_basic_item}>
            <div>
                <small>
                    {label}
                </small>
                <b>
                    {getLevelLabel(data)}
                </b>
            </div>
            <div className={detailStyles.tour_basic_item_icon}>
                {getLevelIcon(data)}
            </div>
            <div className={detailStyles.tour_basic_item_help}>
                <BiInfoCircle />
            </div>
        </div>
    );
};

export default TourLevel;