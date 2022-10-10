import React, { useState } from "react";
import * as detailStyles from "./detail/detail-item.module.scss";
import Modal from "./modal";
import { AnimatePresence } from "framer-motion";
import { BsArrowClockwise, BsFillTriangleFill } from 'react-icons/bs';
import { VscArrowSwap, VscArrowRight } from 'react-icons/vsc';

const Easy = () => {
    return (
        <div>
            <div className={detailStyles.card_triangle}>
                <BsFillTriangleFill className={detailStyles.tour_level_easy} />
            </div>
        </div>
    )
}
const Medium = () => {
    return (
        <div>
            <div className={detailStyles.card_triangle}>
                <BsFillTriangleFill className={detailStyles.tour_level_medium} />
            </div>
        </div>
    )
}
const Hard = () => {
    return (
        <div>
            <div className={detailStyles.card_triangle}>
                <BsFillTriangleFill className={detailStyles.tour_level_hard} />
            </div>
        </div>
    )
}
const Ferrata = () => {
    return (
        <div>
            <div className={detailStyles.card_triangle}>
                <BsFillTriangleFill className={detailStyles.tour_level_alert} />
                </div>
        </div>
    )
}
const Guided = () => {
    return (
        <div>
            <div className={detailStyles.card_triangle}>
                <BsFillTriangleFill className={detailStyles.tour_level_alert} />
                </div>
        </div>
    )
}

const Level = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div>
                {data === 'easy' ? <Easy /> : null}
                {data === 'medium' ? <Medium /> : null}
                {data === 'hard' ? <Hard /> : null}
                {data === 'ferrata' ? <Ferrata /> : null}
                {data === 'guided' ? <Guided /> : null}
            </div>
            <AnimatePresence>
                {isOpen &&
                    <Modal setIsOpen={setIsOpen}>
                        <h3>nieco sadfsa</h3>
                    </Modal>
                }
            </AnimatePresence>
        </>
    )
}
const Okruh = () => {
    return (
        <>
            <div className={detailStyles.card_icon}>
                <BsArrowClockwise />
            </div>
        </>
    )
}
const TamSpat = () => {
    return (
        <>
            <div className={detailStyles.card_icon}>
                <VscArrowSwap />
            </div>
        </>
    )
}
const Prechod = () => {
    return (
        <>
            <div className={detailStyles.card_icon}>
                <VscArrowRight />
            </div>
        </>
    )
}
const Type = ({ data }) => {

    return (
        <div>
            {data === 'okruh' ? <Okruh /> : null}
            {data === 'tamSpat' ? <TamSpat /> : null}
            {data === 'prechod' ? <Prechod /> : null}
        </div>
    )
}

const LevelsCard = ({ type, data }) => {
    return (
        <>
            {type === 'level' ? <Level data={data} /> : null}
            {type === 'type' ? <Type data={data} /> : null}
        </>
    );
};

export default LevelsCard;