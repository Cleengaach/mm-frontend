import React from "react";
import * as detailStyles from "./detail-item.module.scss";

const DetailItem = ({ label,data,metric }) => {
    return (
        <div className={detailStyles.tour_basic_item}>
            <small>
                {label}
            </small>
            <b>
                {data}
            </b>
            <span>
                {metric}
            </span>
        </div>
    );
};

export default DetailItem;