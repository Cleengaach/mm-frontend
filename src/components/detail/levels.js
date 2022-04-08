import React, { useState } from "react";
import * as detailStyles from "./detail-item.module.scss";
import Modal from "../modal";
import { AnimatePresence } from "framer-motion";
import { BsArrowClockwise } from '@react-icons/all-files/bs/BsArrowClockwise';
import { CgArrowLongRightR } from '@react-icons/all-files/cg/CgArrowLongRightR';
import { VscArrowSwap } from 'react-icons/vsc';
import Triangel from '../../assets/images/triangel.inline.svg'

const Easy = () => {
    return (
        <div>
            <Triangel className={detailStyles.tour_level_easy} />
            <small>ľahká</small>
        </div>
    )
}
const Medium = () => {
    return (
        <div>
            <Triangel className={detailStyles.tour_level_medium}  />
            <small>stredná</small>
        </div>
    )
}
const Hard = () => {
    return (
        <div>
            <Triangel className={detailStyles.tour_level_hard}  />
            <small>ťažká</small>
        </div>
    )
}
const Ferrata = () => {
    return (
        <div>
            <Triangel className={detailStyles.tour_level_hard}  />
            <small>ferata</small>
        </div>
    )
}
const Guided = () => {
    return (
        <div>
            <Triangel className={detailStyles.tour_level_hard}  />
            <small>s vodcom</small>
        </div>
    )
}

const Level = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={detailStyles.tour_basic_item} onClick={() => setIsOpen(true)}>
                <div>
                    <small>
                        {data === 'easy' ? <Easy /> : null}
                        {data === 'medium' ? <Medium /> : null}
                        {data === 'hard' ? <Hard /> : null}
                        {data === 'ferrata' ? <Ferrata /> : null}
                        {data === 'guided' ? <Guided /> : null}
                    </small>
                </div>

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
            <span className={detailStyles.tour_basic_item_icon}>
                <BsArrowClockwise />
            </span>
            <small>okruh</small>
        </>
    )
}
const TamSpat = () => {
    return (
        <>
            <span className={detailStyles.tour_basic_item_icon}>
                <VscArrowSwap />
            </span>
            <small>tam a späť</small>
        </>
    )
}
const Prechod = () => {
    return (
        <>
            <span className={detailStyles.tour_basic_item_icon}>
                <CgArrowLongRightR />
            </span>
            <small>prechod</small>
        </>
    )
}
const Type = ({ data }) => {
    return (
        <div className={detailStyles.tour_basic_item}>
            <div>
                {data === 'okruh' ? <Okruh /> : null}
                {data === 'tamSpat' ? <TamSpat /> : null}
                {data === 'prechod' ? <Prechod /> : null}
            </div>
        </div>
    )
}

const Levels = ({ type, data }) => {

    return (
        <>
            {type === 'level' ? <Level data={data} /> : null}
            {type === 'type' ? <Type data={data} /> : null}
        </>
    );
};

export default Levels;