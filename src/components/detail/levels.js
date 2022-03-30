import React, { useState } from "react";
import * as detailStyles from "./detail-item.module.scss";
import Modal from "../modal";
import { AnimatePresence } from "framer-motion";

const Level = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={detailStyles.tour_basic_item} onClick={() => setIsOpen(true)}>
                <div  >
                    {data === 'easy' ? 'ľahká' : null}
                    {data === 'medium' ? 'stredná' : null}
                    {data === 'hard' ? 'ťažká' : null}
                    {data === 'ferrata' ? 'ferata' : null}
                    {data === 'guided' ? 's vodcom' : null}
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
const Type = ({ data }) => {
    return (
        <div className={detailStyles.tour_basic_item}>
            <div >
                {data === 'okruh' ? 'okruh' : null}
                {data === 'tamSpat' ? 'tam a späť' : null}
                {data === 'prechod' ? 'prechod' : null}
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