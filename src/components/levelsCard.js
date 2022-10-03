import React, { useState } from "react";
import * as detailStyles from "./detail/detail-item.module.scss";
import Modal from "./modal";
import { AnimatePresence } from "framer-motion";
import { BsArrowClockwise, BsFillTriangleFill } from 'react-icons/bs';
import { VscArrowSwap } from 'react-icons/vsc';

const Easy = () => {
    return (
        <div>
            <triangle>
                <BsFillTriangleFill className={detailStyles.tour_level_easy} />
            </triangle>
        </div>
    )
}
const Medium = () => {
    return (
        <div>
            <triangle>
                <BsFillTriangleFill className={detailStyles.tour_level_medium} />
            </triangle>
        </div>
    )
}
const Hard = () => {
    return (
        <div>
            <triangle>
                <BsFillTriangleFill className={detailStyles.tour_level_hard} />
            </triangle>
        </div>
    )
}
const Ferrata = () => {
    return (
        <div>
            <triangle>
                <BsFillTriangleFill className={detailStyles.tour_level_alert} />
            </triangle>
        </div>
    )
}
const Guided = () => {
    return (
        <div>
            <triangle>
                <BsFillTriangleFill className={detailStyles.tour_level_alert} />
            </triangle>
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
            <icon>
                <BsArrowClockwise />
            </icon>
        </>
    )
}
const TamSpat = () => {
    return (
        <>
            <icon>
                <VscArrowSwap />
            </icon>
        </>
    )
}
const Prechod = () => {
    return (
        <>
            <icon>
            </icon>
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