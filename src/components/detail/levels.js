import React, { useState } from "react";
import * as detailStyles from "./detail-item.module.scss";
import Modal from "../modal";
import { AnimatePresence } from "framer-motion";
import { BsArrowClockwise, BsFillTriangleFill } from 'react-icons/bs';
import { VscArrowSwap } from 'react-icons/vsc';
import Triangel from '../../assets/images/triangel.inline.svg'

const Easy = () => {
    return (
        <div>
            <triangle>
                <BsFillTriangleFill className={detailStyles.tour_level_easy} />
            </triangle>
            <span>ľahká</span>
        </div>
    )
}
const Medium = () => {
    return (
        <div>
            <triangle>
                <BsFillTriangleFill className={detailStyles.tour_level_medium} />
            </triangle>
            <span>stredná</span>
        </div>
    )
}
const Hard = () => {
    return (
        <div>
            <triangle>
                <BsFillTriangleFill className={detailStyles.tour_level_hard} />
            </triangle>
            <span>ťažká</span>
        </div>
    )
}
const Ferrata = () => {
    return (
        <div>
            <triangle>
                <BsFillTriangleFill className={detailStyles.tour_level_alert} />
            </triangle>
            <span>ferata</span>
        </div>
    )
}
const Guided = () => {
    return (
        <div>
            <triangle>
                <BsFillTriangleFill className={detailStyles.tour_level_alert} />
            </triangle>
            <span>s vodcom</span>
        </div>
    )
}

const Level = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                <small>
                    {data === 'easy' ? <Easy /> : null}
                    {data === 'medium' ? <Medium /> : null}
                    {data === 'hard' ? <Hard /> : null}
                    {data === 'ferrata' ? <Ferrata /> : null}
                    {data === 'guided' ? <Guided /> : null}
                </small>

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
            <span>okruh</span>
        </>
    )
}
const TamSpat = () => {
    return (
        <>
            <icon>
                <VscArrowSwap />
            </icon>
            <span>tam a späť</span>
        </>
    )
}
const Prechod = () => {
    return (
        <>
            <icon>
            </icon>
            <span>prechod</span>
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

const Levels = ({ type, data }) => {
    return (
        <>
            {type === 'level' ? <Level data={data} /> : null}
            {type === 'type' ? <Type data={data} /> : null}
        </>
    );
};

export default Levels;